import { useCliente } from "../../../../hooks/useCliente";
import type { ClienteType } from "../../../../types/ClienteType";
import { ButtonForm } from "../atoms/ButtonForm";
import { Form } from "../atoms/Form";
import { InputForm } from "../atoms/InputForm";
import { LabelForm } from "../atoms/LabelForm";



export function FormAddCliente(){
    const { createCliente } = useCliente();

    return (
        <Form onSubmit={(e) => {
            e.preventDefault();
            // imprimir en consola el valor de los inputs
            const formData = new FormData(e.currentTarget);
            const data = Object.fromEntries(formData.entries());
            const cliente: ClienteType = {
                Clave_Cliente: data.clave_cliente.toString(),
                Nombre: data.nombre.toString(),
                Celular: data.celular.toString(),
                Email: data.email.toString()
            }
            console.log(cliente);

            createCliente(cliente). then((data) => {
                console.log(data);
            })
        }
        }>
            <div>
                <LabelForm htmlFor="clave_cliente">Clave de Cliente</LabelForm>
                <InputForm type="text" id="clave_cliente" name="clave_cliente" required />
            </div>
            <div>
                <LabelForm htmlFor="nombre">Nombre</LabelForm>
                <InputForm type="text" id="nombre" name="nombre"  />
            </div>
            <div>
                <LabelForm htmlFor="celular">Celular</LabelForm>
                <InputForm type="text" id="celular" name="celular"  />
            </div>
            <div>
                <LabelForm htmlFor="email">Email</LabelForm>
                <InputForm type="text" id="email" name="email"  />
            </div>
            <div className="BtnForm">
                <ButtonForm type="submit">Agregar</ButtonForm>
            </div>
        </Form>
    );
}