import { useState } from "react";
import { FormAddCliente } from "../molecules/FormAddCliente";
import { FormUpdateCliente } from "../molecules/FormUpdateCliente";
import { FormDeleteCliente } from "../molecules/FormDeleteCliente";
import { ButtonsForm } from "../molecules/ButtonsForm";

// Cambiar entre formularios
export function FormsUser(){
    const [formType, setFormType] = useState<number>(0);

    const handleFormTypeChange = (type: number) => {
        setFormType(type);
    }
    return(
        <>
            <ButtonsForm $onClick={handleFormTypeChange} formType={formType}/>
            {
                formType === 0 ? 
                (<FormAddCliente />) :
                formType === 1 ? 
                (<FormUpdateCliente />) :
                (<FormDeleteCliente />) 
            }
        </>

    )
}