import { ButtonForm } from "../atoms/ButtonForm";
import { Form } from "../atoms/Form";
import { InputForm } from "../atoms/InputForm";
import { LabelForm } from "../atoms/LabelForm";

export function FormUpdateUser() {
    return(
        <Form>
            <LabelForm htmlFor="name">Name</LabelForm>
            <InputForm type="text" id="name" name="name" required />
            <LabelForm htmlFor="email">Email</LabelForm>
            <InputForm type="email" id="email" name="email" required />
            <LabelForm htmlFor="password">Password</LabelForm>
            <InputForm type="password" id="password" name="password" required />
            <ButtonForm type="submit">Update User</ButtonForm>
        </Form>
    );
}