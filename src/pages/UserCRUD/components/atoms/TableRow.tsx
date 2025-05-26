import styled from 'styled-components';

export const TableRow = styled.tr`
  transition: all 0.3s ease;
  
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
  
  &:hover {
    background-color: #e9e9e9;
    color: #272727;
  }
`;