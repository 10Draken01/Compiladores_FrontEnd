import axios from "axios";
import type { UserType } from "../types/UserType";

type ApiResponse<T> = {
  data?: T;
  error?: string;
};

export const useUser = () => {
    const createUser = async (
        user: UserType
    ): Promise<ApiResponse<UserType>> => {
        try {
        const response = await axios.post(
            "http://localhost:8000/api/users/",
            user,
            {
            headers: { "Content-Type": "application/json" },
            }
        );
        return { data: response.data as UserType };
        } catch (error: unknown) {
        return { error: "Error creando usuario" };
        }
    };

    const getUser = async (
        clave_user: string
    ): Promise<ApiResponse<UserType>> => {
        try {
        const response = await axios.get(
            `http://localhost:8000/api/users/${clave_user}`,
            {
            headers: { "Content-Type": "application/json" },
            }
        );
        return { data: response.data as UserType };
        } catch (error: unknown) {
        return { error: "Error obteniendo usuario" };
        }
    };

    const updateUser = async (
        user: UserType
    ): Promise<ApiResponse<{ message: string }>> => {
        try {
        const response = await axios.put(
            `http://localhost:8000/api/users/${user.Clave_User}`,
            user,
            {
            headers: { "Content-Type": "application/json" },
            }
        );
        return { data: response.data as { message: string } };
        } catch (error: unknown) {
        return { error: "Error actualizando usuario" };
        }
    };

    const deleteUser = async (
        clave_user: string
    ): Promise<ApiResponse<{ message: string }>> => {
        try {
        const response = await axios.delete(
            `http://localhost:8000/api/users/${clave_user}`,
            {
            headers: { "Content-Type": "application/json" },
            }
        );
        return { data: response.data as { message: string } };
        } catch (error: unknown) {
        return { error: "Error eliminando usuario" };
        }
    };

    const getUsers = async (
        page: number
    ): Promise<ApiResponse<UserType[]>> => {
        try {
        const response = await axios.get(
            `http://localhost:8000/api/users/page/${page}`,
            {
            headers: { "Content-Type": "application/json" },
            }
        );
        return { data: response.data as UserType[] };
        } catch (error: unknown) {
        return { error: "Error obteniendo usuarios" };
        }
    };

    return { createUser, getUser, updateUser, deleteUser, getUsers };
};