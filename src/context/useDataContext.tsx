import { createContext, useContext, useEffect, useState, useCallback } from "react";
import type { DataContextType } from "../types/DataContextType";
import type { DataProviderProps } from "../types/DataProviderProps";
import type { ClienteType } from "../types/ClienteType";
import { useCliente } from "../hooks/useCliente";

const DataContext = createContext<DataContextType | null>(null);

export function DataProvider({ children }: DataProviderProps) {
    const [clientes, setClientes] = useState<ClienteType[]>([]);
    const [displayPage, setDisplayPage] = useState<number>(1);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [clientesPerPage] = useState<number>(10);
    const [apiPage, setApiPage] = useState<number>(1);
    const [totalApiPages] = useState<number>(100); // Máximo de páginas API disponibles
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [filterBy, setFilterBy] = useState<'all' | 'with_errors' | 'without_errors'>('all');
    const [currentClientes, setCurrentClientes] = useState<ClienteType[]>([]);

    const { getClientes, createCliente, updateCliente, deleteCliente } = useCliente();

    // Obtener clientes de la API
    const refreshClientes = useCallback(async (page: number = apiPage) => {
        setLoading(true);
        setError(null);
        try {
            const response = await getClientes(page);
            if (response.data) {
                setClientes(response.data);
                setCurrentPage(1); // Reset a la primera página de visualización
            } else if (response.error) {
                setError(response.error);
            }
        } catch (error) {
            setError("Error inesperado al cargar usuarios");
        } finally {
            setLoading(false);
        }
    }, [getClientes, apiPage]);

    // Cambiar página de API
    const changeApiPage = useCallback(async (newPage: number) => {
        if (newPage >= 1 && newPage <= totalApiPages) {
            setApiPage(newPage);
            await refreshClientes(newPage);
        }
    }, [refreshClientes, totalApiPages]);

    // Filtrar y buscar clientes
    const getFilteredClientes = useCallback(() => {
        let filtered = [...clientes];

        // Aplicar búsqueda y validar que sea numerico
        if (searchTerm) {
            filtered = filtered.filter(cliente =>
                cliente.Nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                cliente.Clave_Cliente.includes(searchTerm) ||
                cliente.Email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                cliente.Celular.includes(searchTerm)
            );

            if (filtered.length === 0) {
                // Buscar en la base de datos si no se encuentra en la lista
            }
        }

        // Aplicar filtros
        if (filterBy === 'with_errors') {
            filtered = filtered.filter(cliente =>
                cliente.Errores && (
                    cliente.Errores.Nombre?.length > 0 ||
                    cliente.Errores.Celular?.length > 0 ||
                    cliente.Errores.Email?.length > 0
                )
            );
        } else if (filterBy === 'without_errors') {
            filtered = filtered.filter(cliente =>
                !cliente.Errores || (
                    cliente.Errores.Nombre?.length === 0 &&
                    cliente.Errores.Celular?.length === 0 &&
                    cliente.Errores.Email?.length === 0
                )
            );
        }

        return filtered;
    }, [clientes, searchTerm, filterBy]);


    // Obtener clientes para la página actual de visualización
    useEffect(() => {
        const filtered = getFilteredClientes();

        if (filtered) {
            const startIndex = (currentPage - 1) * clientesPerPage;
            const endIndex = startIndex + clientesPerPage;
            setCurrentClientes([...filtered.slice(startIndex, endIndex)])
        }
    }, [getFilteredClientes, currentPage, clientesPerPage]);

    // Calcular total de páginas de visualización
    const getTotalPages = useCallback(() => {
        const filtered = getFilteredClientes();
        return Math.ceil(filtered.length / clientesPerPage);
    }, [getFilteredClientes, clientesPerPage]);

    // CRUD Operations
    const addCliente = useCallback(async (cliente: Omit<ClienteType, '_id'>): Promise<boolean> => {
        setError(null);
        const response = await createCliente(cliente);
        if (response.data) {
            await refreshClientes();
            return true;
        } else if (response.error) {
            setError(response.error);
            return false;
        }
        return false;
    }, [createCliente, refreshClientes]);

    const updateClienteData = useCallback(async (cliente: ClienteType): Promise<boolean> => {
        setError(null);
        const response = await updateCliente(cliente);
        if (response.data) {
            await refreshClientes();
            return true;
        } else if (response.error) {
            setError(response.error);
            return false;
        }
        return false;
    }, [updateCliente, refreshClientes]);

    const deleteClienteData = useCallback(async (claveCliente: string): Promise<boolean> => {
        setError(null);
        const response = await deleteCliente(claveCliente);
        if (response.data) {
            await refreshClientes();
            return true;
        } else if (response.error) {
            setError(response.error);
            return false;
        }
        return false;
    }, [deleteCliente, refreshClientes]);

    // Carga inicial
    useEffect(() => {
        let isMounted = true;

        const loadInitialData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await getClientes(1);
                if (isMounted) {
                    if (response.data) {
                        setCurrentClientes([...response.data.slice(0, 9)])
                        setClientes(response.data);
                    } else if (response.error) {
                        setError(response.error);
                    }
                }
            } catch (error) {
                if (isMounted) {
                    setError("Error inesperado al cargar usuarios");
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        loadInitialData();

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <DataContext.Provider value={{
            clientes,
            setClientes,
            error,
            setError,
            loading,
            setLoading,
            refreshClientes,
            addCliente,
            updateCliente: updateClienteData,
            deleteCliente: deleteClienteData,
            // Nuevas funcionalidades de paginación
            currentClientes,
            setCurrentClientes,
            currentPage,
            setCurrentPage,
            clientesPerPage,
            apiPage,
            setApiPage: changeApiPage,
            totalApiPages,
            displayPage,
            setDisplayPage,
            searchTerm,
            setSearchTerm,
            filterBy,
            setFilterBy,
            getTotalPages,
            getFilteredClientes
        }}>
            {children}
        </DataContext.Provider>
    );
}

export const useDataContext = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useDataContext debe ser usado dentro de DataProvider');
    }
    return context;
};