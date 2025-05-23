import type { ClienteType } from "./ClienteType";

export interface DataContextType {
    clientes: ClienteType[];
    setClientes: (clientes: ClienteType[]) => void;
    error: string | null;
    setError: (error: string | null) => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
    refreshClientes: () => Promise<void>;
    addCliente: (cliente: Omit<ClienteType, '_id'>) => Promise<boolean>;
    updateCliente: (cliente: ClienteType) => Promise<boolean>;
    deleteCliente: (claveCliente: string) => Promise<boolean>;
    
    // Paginación y navegación
    currentPage: number;
    setCurrentPage: (page: number) => void;
    clientesPerPage: number;
    apiPage: number;
    setApiPage: (page: number) => Promise<void>;
    totalApiPages: number;
    
    // Búsqueda y filtros
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    filterBy: 'all' | 'with_errors' | 'without_errors';
    setFilterBy: (filter: 'all' | 'with_errors' | 'without_errors') => void;
    
    // Funciones útiles
    getCurrentPageClientes: () => ClienteType[];
    getTotalPages: () => number;
    getFilteredClientes: () => ClienteType[];
}