import { useState } from "react";
import { useCliente } from "../../../../hooks/useCliente";
import { ButtonForm } from "../atoms/ButtonForm";
import { Form } from "../atoms/Form";
import { InputForm } from "../atoms/InputForm";
import { LabelForm } from "../atoms/LabelForm";
import { useDataContext } from "../../../../context/useDataContext";

export function FormDeleteCliente() {
    const { loading, setLoading } = useDataContext()
    const { deleteCliente } = useCliente();
    const [claveCliente, setClaveCliente] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (!claveCliente.trim()) {
            alert("Por favor ingresa la clave del cliente");
            return;
        }

        setLoading(true);
        
        try {
            const response = await deleteCliente(claveCliente);
            setClaveCliente(""); // Limpiar el formulario
            if (response.data) {
                console.log("Cliente eliminado:", response.data);
            } else if (response.error) {
                alert("Error al eliminar el cliente: " + response.error);
            }
        } catch (error) {
            console.error("Error al eliminar cliente:", error);
            alert("Error al eliminar el cliente. Por favor intenta de nuevo.");
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setClaveCliente(e.target.value);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <div>
                <LabelForm htmlFor="clave_cliente">Clave de Cliente</LabelForm>
                <InputForm 
                    type="text" 
                    id="clave_cliente" 
                    name="clave_cliente" 
                    value={claveCliente}
                    onChange={handleInputChange}
                    disabled={loading}
                    required 
                />
            </div>
            <div className="BtnForm">
                <ButtonForm 
                    type="submit" 
                    disabled={loading || !claveCliente.trim()}
                >
                    {loading ? "Eliminando..." : "Borrar"}
                </ButtonForm>
            </div>
        </Form>
    );
}