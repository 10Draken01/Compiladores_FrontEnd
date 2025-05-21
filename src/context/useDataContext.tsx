import { createContext, useEffect, useState } from "react";
import type { DataContextType } from "../types/DataContextType";
import type { DataProviderProps } from "../types/DataProviderProps";
import { useUser } from "../hooks/useUser";
import type { UserType } from "../types/UserType";

const dataContext = createContext<DataContextType | null>(null);

export function DataProvider({ children }: DataProviderProps) {
    const [data, setData] = useState<UserType[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const { getUsers } = useUser();

    useEffect(() => {
        const users = async () => {
            setLoading(true);
            try {
                const response = await getUsers(1);
                
                if (Array.isArray(response.data)) {
                    setData(response.data);
                } else if ("error" in response){
                    console.log(response.error)
                }
            } catch (error) {
                setError("Error fetching data");
            } finally {
                setLoading(false);
            }
        }
        users();
    }, []);

    return (
        <dataContext.Provider 
        value={{
            data,
            setData,
            error,
            setError,
            loading,
            setLoading
        }}>
            {children}
        </dataContext.Provider>
    );
}