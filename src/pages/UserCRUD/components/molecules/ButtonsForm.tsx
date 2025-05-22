import { ButtonSelectionForm } from "../atoms/ButtonSelectionForm";
import { ContainerFormsButtons } from "../atoms/ContainerFormsButtons";

export function ButtonsForm({ $onClick, formType }: { $onClick: (v: number) => void, formType: number }) {
    return(
        <ContainerFormsButtons>
            <ButtonSelectionForm 
                onClick={() => $onClick(0)} 
                $selected={formType === 0}
            >
                Add User
            </ButtonSelectionForm>
            <ButtonSelectionForm 
                onClick={() => $onClick(1)} 
                $selected={formType === 1}
            >
                Update User
            </ButtonSelectionForm>
            <ButtonSelectionForm 
                onClick={() => $onClick(2)} 
                $selected={formType === 2}
            >
                Delete User
            </ButtonSelectionForm>
        </ContainerFormsButtons>
    )
}