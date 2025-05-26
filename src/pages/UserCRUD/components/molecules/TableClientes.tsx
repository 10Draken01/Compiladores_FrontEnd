import { useDataContext } from "../../../../context/useDataContext";
import type { ClienteType } from "../../../../types/ClienteType";
import { ErrorBadge } from "../atoms/ErrorBadge";
import { ErrorTooltip } from "../atoms/ErrorTooltip";
import { TableCell } from "../atoms/TableCell";
import { TableClientesContainer } from "../atoms/TableClientesContainer";
import { TableHead } from "../atoms/TableHead";
import { TableHeader2 } from "../atoms/TableHeader2";
import { TableRow } from "../atoms/TableRow";
import { TableWrapper } from "../atoms/TableWrapper";

export function TableClientes() {
    const { 
        currentClientes,
    } = useDataContext()
    
    // Check if cliente has errors
    const hasErrors = (cliente: ClienteType) => {
        return cliente.Errores != null 
    };

    return (
        <TableWrapper>
          <TableClientesContainer>
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
              {
                currentClientes.length > 0 ? 
                currentClientes.map((cliente) => (
                    <TableRow key={cliente.Clave_Cliente}>
                        <TableCell title={cliente.Clave_Cliente}>{cliente.Clave_Cliente}</TableCell>
                        <TableCell title={cliente.Nombre}>{cliente.Nombre}</TableCell>
                        <TableCell title={cliente.Celular}>{cliente.Celular}</TableCell>
                        <TableCell title={cliente.Email}>{cliente.Email}</TableCell>
                        <TableCell>
                            <ErrorTooltip cliente={cliente}>
                            <ErrorBadge $hasErrors={hasErrors(cliente)}>
                                {hasErrors(cliente) ? 'Con errores' : 'Sin errores'}
                            </ErrorBadge>
                            </ErrorTooltip>
                        </TableCell>
                    </TableRow>
                )) :
                (
                    <TableRow>
                        <TableCell colSpan={5} style={{ textAlign: 'center' }}>
                            No hay clientes disponibles
                        </TableCell>
                    </TableRow>
                )
              }
            </tbody>
          </TableClientesContainer>
        </TableWrapper>
    );
}