import { useDataContext } from "../../../../context/useDataContext";
import { PageButton } from "../atoms/PageButton";
import { PaginationControls } from "../atoms/PaginationControls";
import { PaginationInfoContainer } from "../atoms/PaginationInfoContainer";

export function PaginationInfo() {
    const { displayPage, setDisplayPage, setCurrentPage, clientesPerPage, getFilteredClientes } = useDataContext();


    // Calculate total pages for display pagination
    const getTotalDisplayPages = () => {
        const filtered = getFilteredClientes();
        return Math.ceil(filtered.length / clientesPerPage);
    };

    // Handle display page change
    const handleDisplayPageChange = (page: number) => {
        const totalPages = getTotalDisplayPages();
        if (page >= 1 && page <= totalPages) {
            setDisplayPage(page);
            setCurrentPage(page);
        }
    };

    const totalDisplayPages = getTotalDisplayPages();
    const filteredCount = getFilteredClientes().length;
    return (
        
        <PaginationInfoContainer>
            <div>
            Mostrando {((displayPage - 1) * clientesPerPage) + 1} - {Math.min(displayPage * clientesPerPage, filteredCount)} de {filteredCount} clientes
            </div>
            <PaginationControls>
            <PageButton
                onClick={() => handleDisplayPageChange(1)}
                disabled={displayPage === 1}
            >
                Primera
            </PageButton>
            <PageButton
                onClick={() => handleDisplayPageChange(displayPage - 1)}
                disabled={displayPage === 1}
            >
                Anterior
            </PageButton>
            <span>
                Página {displayPage} de {totalDisplayPages}
            </span>
            <PageButton
                onClick={() => handleDisplayPageChange(displayPage + 1)}
                disabled={displayPage === totalDisplayPages}
            >
                Siguiente
            </PageButton>
            <PageButton
                onClick={() => handleDisplayPageChange(totalDisplayPages)}
                disabled={displayPage === totalDisplayPages}
            >
                Última
            </PageButton>
            </PaginationControls>
        </PaginationInfoContainer>
    );
}