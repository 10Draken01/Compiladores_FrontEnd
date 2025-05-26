import { useState, useCallback, useRef } from "react";
import { ButtonForm } from "../atoms/ButtonForm";
import { Form } from "../atoms/Form";
import { InputForm } from "../atoms/InputForm";
import { LabelForm } from "../atoms/LabelForm";
import { useCliente } from "../../../../hooks/useCliente";
import type { ClienteType } from "../../../../types/ClienteType";
import { useDataContext } from "../../../../context/useDataContext";

interface FormErrors {
  clave_cliente?: string;
  nombre?: string;
  celular?: string;
  email?: string;
  general?: string;
}

export function FormUpdateCliente() {
  const [claveCliente, setClaveCliente] = useState("");
  const [claveAproved, setClaveAproved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const formRef = useRef<HTMLFormElement>(null);
  
  const { updateCliente } = useCliente();
  const { clientes, setClientes } = useDataContext()

  // Validación de clave de cliente
  const validateClaveCliente = useCallback((value: string): boolean => {
    return /^\d+$/.test(value) && value.length > 0;
  }, []);

  // Manejar cambio en clave de cliente
  const handleClienteChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setClaveCliente(value);
    setErrors(prev => ({ ...prev, clave_cliente: undefined }));

    if (validateClaveCliente(value)) {
      setClaveAproved(true);
      setErrors(prev => ({ ...prev, general: undefined }));
    } else {
      setClaveAproved(false);
      if (value.length > 0) {
        setErrors(prev => ({ 
          ...prev, 
          clave_cliente: "La clave debe contener solo números" 
        }));
      }
    }
  }, [validateClaveCliente]);

  // Validar formulario completo
  const validateForm = useCallback((data: ClienteType): FormErrors => {
    const newErrors: FormErrors = {};

    if (!validateClaveCliente(data.Clave_Cliente)) {
      newErrors.clave_cliente = "Clave de cliente inválida";
    }

    return newErrors;
  }, [validateClaveCliente]);

  // Manejar envío del formulario
  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    const formData = new FormData(e.currentTarget);
    const clientData: ClienteType = {
      Clave_Cliente: formData.get("clave_cliente") as string,
      Nombre: formData.get("nombre") as string,
      Celular: formData.get("celular") as string,
      Email: formData.get("email") as string,
    };

    // Validar datos
    const formErrors = validateForm(clientData);
    
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setIsLoading(false);
      return;
    }

    try {
      const response: any = await updateCliente(clientData);
      
      if (response.data) {
        // Resetear formulario exitosamente
        formRef.current?.reset();
        setClaveCliente("");
        setClaveAproved(false);
        setErrors({});

        setClientes([...clientes.map(cliente => {
          if (cliente.Clave_Cliente === clientData.Clave_Cliente) {
            return { ...cliente, 
              Nombre: clientData.Nombre,
              Celular: clientData.Celular,
              Email: clientData.Email,
              Errores: response.data.Errores || null
             };
          }
          return cliente;
        })]);
        
        console.log("Cliente actualizado exitosamente");
        // Aquí podrías mostrar un mensaje de éxito
      } else if (response?.response?.data?.error) {
        setErrors({ 
          general: response?.response.data.error 
        });
      } else {
        setErrors({ 
          general: response.error || "Error al actualizar el cliente" 
        });
      }
    } catch (error) {
      setErrors({ 
        general: "Error inesperado al actualizar el cliente" 
      });
      console.error("Error updating client:", error);
    } finally {
      setIsLoading(false);
    }
  }, [updateCliente, validateForm]);

  // Resetear formulario
  const handleReset = useCallback(() => {
    formRef.current?.reset();
    setClaveCliente("");
    setClaveAproved(false);
    setErrors({});
  }, []);

  return (
    <Form ref={formRef} onSubmit={handleSubmit}>
      {errors.general && (
        <div className="error-message" style={{ color: 'red', marginBottom: '1rem' }}>
          {errors.general}
        </div>
      )}

      <div>
        <LabelForm htmlFor="clave_cliente">
          Clave de Cliente
        </LabelForm>
        <InputForm
          type="text"
          id="clave_cliente"
          name="clave_cliente"
          value={claveCliente}
          onChange={handleClienteChange}
          placeholder="Ingrese la clave del cliente"
          aria-describedby={errors.clave_cliente ? "clave_cliente_error" : undefined}
        />
        {errors.clave_cliente && (
          <div id="clave_cliente_error" className="error-message" style={{ color: 'red', fontSize: '0.875rem' }}>
            {errors.clave_cliente}
          </div>
        )}
      </div>

      {claveAproved && (
        <>
          <div>
            <LabelForm htmlFor="nombre">Nombre</LabelForm>
            <InputForm 
              type="text" 
              id="nombre" 
              name="nombre" 
              placeholder="Ingrese el nombre completo"
              aria-describedby={errors.nombre ? "nombre_error" : undefined}
            />
            {errors.nombre && (
              <div id="nombre_error" className="error-message" style={{ color: 'red', fontSize: '0.875rem' }}>
                {errors.nombre}
              </div>
            )}
          </div>

          <div>
            <LabelForm htmlFor="celular">Celular</LabelForm>
            <InputForm 
              type="text" 
              id="celular" 
              name="celular" 
              placeholder="Ingrese el número de celular (10 dígitos)"
              maxLength={10}
              aria-describedby={errors.celular ? "celular_error" : undefined}
            />
            {errors.celular && (
              <div id="celular_error" className="error-message" style={{ color: 'red', fontSize: '0.875rem' }}>
                {errors.celular}
              </div>
            )}
          </div>

          <div>
            <LabelForm htmlFor="email">Email</LabelForm>
            <InputForm 
              type="text" 
              id="email" 
              name="email" 
              placeholder="Ingrese el email"
              aria-describedby={errors.email ? "email_error" : undefined}
            />
            {errors.email && (
              <div id="email_error" className="error-message" style={{ color: 'red', fontSize: '0.875rem' }}>
                {errors.email}
              </div>
            )}
          </div>

          <div className="BtnForm" style={{ display: 'flex', gap: '1rem' }}>
            <ButtonForm 
              type="submit" 
              disabled={isLoading}
            >
              {isLoading ? "Actualizando..." : "Actualizar"}
            </ButtonForm>
            <ButtonForm 
              type="button" 
              onClick={handleReset}
              disabled={isLoading}
              style={{ backgroundColor: '#6c757d' }}
            >
              Cancelar
            </ButtonForm>
          </div>
        </>
      )}
    </Form>
  );
}