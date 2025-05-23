export interface ClienteType {
    _id?: string;
    Clave_Cliente: string;
    Nombre: string;
    Celular: string;
    Email: string;
    Errores?: {
        Nombre: string[];
        Celular: string[];
        Email: string[];
    };
}