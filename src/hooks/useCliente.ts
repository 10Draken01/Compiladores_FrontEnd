import axios from "axios";
import type { ClienteType } from "../types/ClienteType";

type ApiResponse<T> = {
  data?: T;
  error?: string;
};

export const useCliente = () => {
    const createCliente = async (
        cliente: ClienteType
    ): Promise<ApiResponse<ClienteType>> => {
        try {
        const response = await axios.post(
            "http://localhost:8000/api/clientes/",
            cliente,
            {
            headers: { "Content-Type": "application/json" },
            }
        );
            console.log(response);
            return { data: response.data as ClienteType };
        } catch (error: any) {
            console.error(error?.response?.data?.error);
            return { error: "Error creando usuario" };
        }
    };

    const getCliente = async (
        clave_cliente: string
    ): Promise<ApiResponse<ClienteType>> => {
        try {
        const response = await axios.get(
            `http://localhost:8000/api/clientes/${clave_cliente}`,
            {
            headers: { "Content-Type": "application/json" },
            }
        );
        return { data: response.data as ClienteType };
        } catch (error: unknown) {
        return { error: "Error obteniendo usuario" };
        }
    };

    const updateCliente = async (
        cliente: ClienteType
    ): Promise<ApiResponse<{ message: string }>> => {
        try {
        const response = await axios.put(
            `http://localhost:8000/api/clientes/${cliente.Clave_Cliente}`,
            cliente,
            {
            headers: { "Content-Type": "application/json" },
            }
        );
        console.log(response);
        return { data: response.data as { message: string } };
        } catch (error: unknown) {
        return { error: "Error actualizando usuario" };
        }
    };

    const deleteCliente = async (
        clave_cliente: string
    ): Promise<ApiResponse<{ message: string }>> => {
        try {
        const response = await axios.delete(
            `http://localhost:8000/api/clientes/${clave_cliente}`,
            {
            headers: { "Content-Type": "application/json" },
            }
        );
        return { data: response.data as { message: string } };
        } catch (error: unknown) {
        return { error: "Error eliminando usuario" };
        }
    };

    const getClientes = async (
        page: number
    ): Promise<ApiResponse<ClienteType[]>> => {
        try {
        const response = await axios.get(
            `http://localhost:8000/api/clientes/page/${page}`,
            {
            headers: { "Content-Type": "application/json" },
            }
        );
        console.log(response);
        return { data: response.data as ClienteType[] };
        } catch (error: unknown) {
        return { error: "Error obteniendo usuarios" + " " + error };
        }
    };

    return { createCliente, getCliente, updateCliente, deleteCliente, getClientes };
};