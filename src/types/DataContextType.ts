import type { UserType } from "./UserType";

export interface DataContextType {
    users: UserType[];
    setUsers: (users: UserType[]) => void;
    error: string | null;
    setError: (error: string | null) => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
    refreshUsers: () => Promise<void>;
    addUser: (user: Omit<UserType, '_id'>) => Promise<boolean>;
    updateUser: (user: UserType) => Promise<boolean>;
    deleteUser: (claveUser: string) => Promise<boolean>;
}