import styled from 'styled-components';

export const TableHeader2 = styled.th`
  padding: 0.75rem;
  text-align: left;
  font-weight: bold;
  box-sizing: border-box;
  word-wrap: break-word;
  overflow-wrap: break-word;
  
  /* Definir anchos específicos para cada columna */
  &:nth-child(1) { width: 15%; } /* Clave Cliente */
  &:nth-child(2) { width: 25%; } /* Nombre */
  &:nth-child(3) { width: 18%; } /* Celular */
  &:nth-child(4) { width: 22%; } /* Email */
  &:nth-child(5) { width: 20%; } /* Estado */
`;