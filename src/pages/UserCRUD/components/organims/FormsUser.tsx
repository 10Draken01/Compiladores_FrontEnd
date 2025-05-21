import { useState } from "react";
import { FormAddUser } from "../molecules/FormAddUser";
import { FormDeleteUser } from "../molecules/FormDeleteUser";
import { FormUpdateUser } from "../molecules/FormUpdateUser";
import { ContainerForms } from "../atoms/ContainerForms";
import { ContainerFormsButtons } from "../atoms/ContainerFormsButtons";
import { ButtonSelectionForm } from "../atoms/ButtonSelectionForm";

// Cambiar entre formularios
export function FormsUser(){
    const [formType, setFormType] = useState<number>(0);

    const handleFormTypeChange = (type: number) => {
        setFormType(type);
    }
    return(
        <ContainerForms>
            <ContainerFormsButtons>
                <ButtonSelectionForm 
                    onClick={() => handleFormTypeChange(0)} 
                    $selected={formType === 0}
                >
                    Add User
                </ButtonSelectionForm>
                <ButtonSelectionForm 
                    onClick={() => handleFormTypeChange(1)} 
                    $selected={formType === 1}
                >
                    Update User
                </ButtonSelectionForm>
                <ButtonSelectionForm 
                    onClick={() => handleFormTypeChange(2)} 
                    $selected={formType === 2}
                >
                    Delete User
                </ButtonSelectionForm>
            </ContainerFormsButtons>
            {
                formType === 0 ? 
                (<FormAddUser />) :
                formType === 1 ? 
                (<FormUpdateUser />) :
                (<FormDeleteUser />) 
            }
        </ContainerForms>

    )
}