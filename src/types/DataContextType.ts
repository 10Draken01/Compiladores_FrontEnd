
export interface DataContextType {
    data: any;
    setData: (data: any) => void;
    error: string | null;
    setError: (error: string | null) => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
}