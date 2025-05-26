import { useDataContext } from '../../../../context/useDataContext';
import { TableContainer } from '../atoms/TableContainer';
import { LoadingSpinner } from '../atoms/LoadingSpinner';
import { PaginationInfo } from '../molecules/PaginationInfo';
import { TableHeader } from '../molecules/TableHeader';
import { Search } from '../molecules/Search';
import { TableClientes } from '../molecules/TableClientes';

export default function ClienteTable() {
  const { 
    loading,
    error
  } = useDataContext()
  

  return (
    <TableContainer>
      <TableHeader/>
      <Search/>

      {loading ? (
        <LoadingSpinner>Cargando clientes...</LoadingSpinner>
      ) : error ? (
        <div style={{ color: 'red', textAlign: 'center', padding: '2rem', boxSizing: 'border-box' }}>
          {error}
        </div>
      ) : (
        <>
          <TableClientes/>
          <PaginationInfo/>
        </>
      )}
    </TableContainer>
  );
}