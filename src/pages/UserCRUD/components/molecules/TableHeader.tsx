import { useCallback, useState } from "react";
import { PageButton } from "../atoms/PageButton";
import { PageInput } from "../atoms/PageInput";
import { PaginationControls } from "../atoms/PaginationControls";
import { TableHeaderContainer } from "../atoms/TableHeaderContainer";
import { Title } from "../atoms/Title";
import { useDataContext } from "../../../../context/useDataContext";
import { useCliente } from "../../../../hooks/useCliente";

export function TableHeader() {
    const {
        setClientes,
        loading, setLoading,
        setError,
        apiPage, setApiPage,
    } = useDataContext()
    const { getClientes } = useCliente()

    const [pageInput, setPageInput] = useState('1');

    // Handle API page change
    const handleApiPageChange = useCallback(async () => {
        const pageNum = parseInt(pageInput);
        if (pageNum > 0 && pageNum !== apiPage) {
            setApiPage(pageNum);
            setLoading(true);
            setError(null);
            try {
                const response = await getClientes(pageNum);
                if (response.data) {
                    setClientes(response.data);
                } else if (response.error) {
                    setError(response.error);
                }
            } catch (error) {
                setError("Error inesperado al cargar usuarios");
            } finally {
                setLoading(false);
            }
        }
    }, [getClientes, apiPage]);

    return (
        <TableHeaderContainer>
            <Title>Lista de Clientes</Title>
            <PaginationControls>
                <span>Página API:</span>
                <PageInput
                    type="number"
                    min="1"
                    value={pageInput}
                    onChange={(e) => setPageInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleApiPageChange()}
                />
                <PageButton onClick={handleApiPageChange} disabled={loading}>
                    Cargar Página {pageInput}
                </PageButton>
                <span style={{ marginLeft: '1rem' }}>Página actual: {apiPage}</span>
            </PaginationControls>
        </TableHeaderContainer>
    );
}