import { useState } from "react";
import { ContainerForms } from "../atoms/ContainerForms";
import { ContainerFormsButtons } from "../atoms/ContainerFormsButtons";
import { ButtonSelectionForm } from "../atoms/ButtonSelectionForm";
import { FormAddUser } from "../molecules/FormAddUser";
import { FormUpdateUser } from "../molecules/FormUpdateUser";
import { FormDeleteUser } from "../molecules/FormDeleteUser";
import { ButtonsForm } from "../molecules/ButtonsForm";

// Cambiar entre formularios
export function FormsUser(){
    const [formType, setFormType] = useState<number>(0);

    const handleFormTypeChange = (type: number) => {
        setFormType(type);
    }
    return(
        <ContainerForms>
            <ButtonsForm $onClick={handleFormTypeChange} formType={formType}/>
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