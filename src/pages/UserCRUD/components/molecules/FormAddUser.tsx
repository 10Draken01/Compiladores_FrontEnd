import { ButtonForm } from "../atoms/ButtonForm";
import { Form } from "../atoms/Form";
import { InputForm } from "../atoms/InputForm";
import { LabelForm } from "../atoms/LabelForm";



export function FormAddUser(){
    return (
        <Form>
            <div>
                <LabelForm htmlFor="name">Name</LabelForm>
                <InputForm type="text" id="name" name="name" required />
            </div>
            <div>
                <LabelForm htmlFor="email">Email</LabelForm>
                <InputForm type="email" id="email" name="email" required />
            </div>
            <div>
                <LabelForm htmlFor="password">Password</LabelForm>
                <InputForm type="password" id="password" name="password" required />
            </div>
            <ButtonForm type="submit">Add User</ButtonForm>
        </Form>
    );
}