import { useCallback, useState } from 'react';
import styled from 'styled-components';
import { useDataContext } from '../../../../context/useDataContext';
import { useCliente } from '../../../../hooks/useCliente';
import type { ClienteType } from '../../../../types/ClienteType';

// Styled Components
const TableContainer = styled.div`
  width: 100%;
  background-color: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  padding: 1rem;
  margin-top: 2rem;
`;

const TableHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  box-sizing: border-box;
  flex-wrap: wrap;
  gap: 1rem;
`;

const Title = styled.h2`
  color: #333;
  box-sizing: border-box;
  margin: 0;
`;

const PaginationControls = styled.div`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  gap: 1rem;
  flex-wrap: wrap;
`;

const PageInput = styled.input`
  width: 80px;
  padding: 0.5rem;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
  text-align: center;
`;

const PageButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background-color: #272727;
  color: white;
  box-sizing: border-box;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover:not(:disabled) {
    background-color: #3f3f3f;
  }
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  box-sizing: border-box;
  margin-bottom: 1rem;
  flex-wrap: wrap;
`;

const SearchInput = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  box-sizing: border-box;
  border-radius: 4px;
  min-width: 200px;
`;

const FilterSelect = styled.select`
  padding: 0.5rem;
  border: 1px solid #ccc;
  box-sizing: border-box;
  border-radius: 4px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  box-sizing: border-box;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const TableHead = styled.thead`
  background-color: #3a3a3a;
  box-sizing: border-box;
  color: white;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
  box-sizing: border-box;
    background-color: #f9f9f9;
  }
  
  &:hover {
    background-color: #e9e9e9;
  }
`;

const TableHeader2 = styled.th`
  padding: 1rem;
  text-align: left;
  box-sizing: border-box;
  font-weight: bold;
`;

const TableCell = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #eee;
  box-sizing: border-box;
  color: #333;
`;

const ErrorBadge = styled.span<{ hasErrors: boolean }>`
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.75rem;
  box-sizing: border-box;
  font-weight: bold;
  background-color: ${props => props.hasErrors ? '#ff4444' : '#44ff44'};
  color: white;
`;

const ErrorDetails = styled.div`
  margin-top: 0.5rem;
  box-sizing: border-box;
  font-size: 0.75rem;
  color: #666;
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  height: 200px;
  font-size: 1.2rem;
  color: #666;
`;

const PaginationInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  flex-wrap: wrap;
  box-sizing: border-box;
  gap: 1rem;
`;



export default function ClienteTable() {
  const { clientes, setClientes, loading, setLoading, error, setError } = useDataContext()
  const { getClientes } = useCliente()
  
  // Pagination states
  const [apiPage, setApiPage] = useState(1);
  const [displayPage, setDisplayPage] = useState(1);
  const [pageInput, setPageInput] = useState('1');
  const clientesPerPage = 10;
  
  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState<'all' | 'with_errors' | 'without_errors'>('all');


  // Filter clientes based on search term and filter
  const getFilteredClientes = () => {
    let filtered = [...clientes];

    // Apply search
    if (searchTerm) {
      filtered = filtered.filter(cliente =>
        cliente.Nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cliente.Clave_Cliente.includes(searchTerm) ||
        cliente.Email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cliente.Celular.includes(searchTerm)
      );
    }

    // Apply filter
    if (filterBy === 'with_errors') {
      filtered = filtered.filter(cliente => 
        cliente.Errores && (
          cliente.Errores.Nombre.length > 0 ||
          cliente.Errores.Celular.length > 0 ||
          cliente.Errores.Email.length > 0
        )
      );
    } else if (filterBy === 'without_errors') {
      filtered = filtered.filter(cliente => 
        !cliente.Errores || (
          cliente.Errores.Nombre.length === 0 &&
          cliente.Errores.Celular.length === 0 &&
          cliente.Errores.Email.length === 0
        )
      );
    }

    return filtered;
  };

  // Get current page clientes for display
  const getCurrentPageClientes = () => {
    const filtered = getFilteredClientes();
    const startIndex = (displayPage - 1) * clientesPerPage;
    const endIndex = startIndex + clientesPerPage;
    return filtered.slice(startIndex, endIndex);
  };

  // Calculate total pages for display pagination
  const getTotalDisplayPages = () => {
    const filtered = getFilteredClientes();
    return Math.ceil(filtered.length / clientesPerPage);
  };

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
          }}, [getClientes, apiPage]);

  // Handle display page change
  const handleDisplayPageChange = (page: number) => {
    const totalPages = getTotalDisplayPages();
    if (page >= 1 && page <= totalPages) {
      setDisplayPage(page);
    }
  };

  // Check if cliente has errors
  const hasErrors = (cliente: ClienteType) => {
    return cliente.Errores != null 
  };

  // Get error details
  const getErrorDetails = (cliente: ClienteType) => {
    if (!cliente.Errores) return null;
    
    const errors = [];
    if (cliente.Errores.Nombre.length > 0) errors.push(`Nombre: ${cliente.Errores.Nombre.join(', ')}`);
    if (cliente.Errores.Celular.length > 0) errors.push(`Celular: ${cliente.Errores.Celular.join(', ')}`);
    if (cliente.Errores.Email.length > 0) errors.push(`Email: ${cliente.Errores.Email.join(', ')}`);
    
    return errors.length > 0 ? errors.join('; ') : null;
  };

  const currentClientes = getCurrentPageClientes();
  const totalDisplayPages = getTotalDisplayPages();
  const filteredCount = getFilteredClientes().length;

  return (
    <TableContainer>
      <TableHeader>
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
      </TableHeader>

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
      </SearchContainer>

      {loading ? (
        <LoadingSpinner>Cargando clientes...</LoadingSpinner>
      ) : error ? (
        <div style={{ color: 'red', textAlign: 'center', padding: '2rem' }}>
          {error}
        </div>
      ) : (
        <>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader2>Clave Cliente</TableHeader2>
                <TableHeader2>Nombre</TableHeader2>
                <TableHeader2>Celular</TableHeader2>
                <TableHeader2>Email</TableHeader2>
                <TableHeader2>Estado</TableHeader2>
              </TableRow>
            </TableHead>
            <tbody>
              {currentClientes.map((cliente) => (
                <TableRow key={cliente._id}>
                  <TableCell>{cliente.Clave_Cliente}</TableCell>
                  <TableCell>{cliente.Nombre}</TableCell>
                  <TableCell>{cliente.Celular}</TableCell>
                  <TableCell>{cliente.Email}</TableCell>
                  <TableCell>
                    <ErrorBadge hasErrors={hasErrors(cliente)}>
                      {hasErrors(cliente) ? 'Con errores' : 'Sin errores'}
                    </ErrorBadge>
                    {hasErrors(cliente) && (
                      <ErrorDetails>
                        {getErrorDetails(cliente)}
                      </ErrorDetails>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>

          <PaginationInfo>
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
          </PaginationInfo>
        </>
      )}
    </TableContainer>
  );
}