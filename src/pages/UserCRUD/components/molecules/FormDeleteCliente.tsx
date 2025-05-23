import { ButtonForm } from "../atoms/ButtonForm";
import { Form } from "../atoms/Form";
import { InputForm } from "../atoms/InputForm";
import { LabelForm } from "../atoms/LabelForm";

export function FormDeleteCliente() {
    return (
        <Form>
            <div>
                <LabelForm htmlFor="clave_cliente">Clave de Cliente</LabelForm>
                <InputForm type="text" id="clave_cliente" name="clave_cliente" required />
            </div>
            <div className="BtnForm">
                <ButtonForm type="submit">Borrar</ButtonForm>
            </div>
        </Form>
    );
}