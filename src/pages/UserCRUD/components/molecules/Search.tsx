import { useState } from "react";
import { useDataContext } from "../../../../context/useDataContext";
import { ButtonForm } from "../atoms/ButtonForm";
import { FilterSelect } from "../atoms/FilterSelect";
import { SearchContainer } from "../atoms/SearchContainer";
import { SearchInput } from "../atoms/SearchInput";
import { useCliente } from "../../../../hooks/useCliente";

export function Search() {
    const {
        searchTerm,
        setSearchTerm,
        setCurrentClientes,
        setError,
        filterBy,
        setFilterBy,
    } = useDataContext()
    const [inputValue, setInputValue] = useState("");
    const { getCliente } = useCliente()

    const searchDB = async () => {
        const response = await getCliente(inputValue)
        if (response.data) {
            setCurrentClientes([response.data])
        } else if(response.error) {
            setError(response.error)
        }
    }

    return (
        <SearchContainer>
            <SearchInput
                type="text"
                placeholder="Buscar por nombre, clave, email o celular..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FilterSelect
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value as 'all' | 'with_errors' | 'without_errors')}
            >
                <option value="all">Todos los clientes</option>
                <option value="with_errors">Con errores</option>
                <option value="without_errors">Sin errores</option>
            </FilterSelect>
            <SearchInput
                type="text"
                placeholder="Buscar en la BD"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <ButtonForm onClick={searchDB}>Buscar</ButtonForm>
        </SearchContainer>
    );
}