import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import type { DataContextType } from "../types/DataContextType";
import type { DataProviderProps } from "../types/DataProviderProps";
import { useUser } from "../hooks/useUser";
import type { UserType } from "../types/UserType";

const DataContext = createContext<DataContextType | null>(null);

export function DataProvider({ children }: DataProviderProps) {
    const [users, setUsers] = useState<UserType[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const { getUsers, createUser, updateUser, deleteUser } = useUser();

    const refreshUsers = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await getUsers(1);
            if (response.data) {
                setUsers(response.data);
            } else if (response.error) {
                setError(response.error);
            }
        } catch (error) {
            setError("Error inesperado al cargar usuarios");
        } finally {
            setLoading(false);
        }
    }, [getUsers]);

    const addUser = useCallback(async (user: Omit<UserType, '_id'>): Promise<boolean> => {
        setError(null);
        const response = await createUser(user);
        if (response.data) {
            await refreshUsers();
            return true;
        } else if (response.error) {
            setError(response.error);
            return false;
        }
        return false;
    }, [createUser, refreshUsers]);

    const updateUserData = useCallback(async (user: UserType): Promise<boolean> => {
        setError(null);
        const response = await updateUser(user);
        if (response.data) {
            await refreshUsers();
            return true;
        } else if (response.error) {
            setError(response.error);
            return false;
        }
        return false;
    }, [updateUser, refreshUsers]);

    const deleteUserData = useCallback(async (claveUser: string): Promise<boolean> => {
        setError(null);
        const response = await deleteUser(claveUser);
        if (response.data) {
            await refreshUsers();
            return true;
        } else if (response.error) {
            setError(response.error);
            return false;
        }
        return false;
    }, [deleteUser, refreshUsers]);

    useEffect(() => {
        refreshUsers();
    }, [refreshUsers]);

    return (
        <DataContext.Provider value={{
            users,
            setUsers,
            error,
            setError,
            loading,
            setLoading,
            refreshUsers,
            addUser,
            updateUser: updateUserData,
            deleteUser: deleteUserData
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