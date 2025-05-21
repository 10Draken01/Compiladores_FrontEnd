import { ButtonForm } from "../atoms/ButtonForm";
import { Form } from "../atoms/Form";
import { InputForm } from "../atoms/InputForm";
import { LabelForm } from "../atoms/LabelForm";

export function FormDeleteUser() {
    return (
        <Form>
            <LabelForm htmlFor="id">ID</LabelForm>
            <InputForm type="text" id="id" name="id" required />
            <ButtonForm type="submit">Delete User</ButtonForm>
        </Form>
    );
}