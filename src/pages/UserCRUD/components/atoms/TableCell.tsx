import styled from 'styled-components';

export const TableCell = styled.td`
  border-bottom: 1px solid #eee;
  color: #333;
  box-sizing: border-box;
  word-wrap: break-word;
  overflow-wrap: break-word;
  padding: 0.5rem;
  
  /* Truncar texto largo con ellipsis */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  
  /* Para la columna de estado, permitir wrap */
  &:nth-child(5) {
    white-space: normal;
    overflow: visible;
    text-overflow: unset;
  }
`;