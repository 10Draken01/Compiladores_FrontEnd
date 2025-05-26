import styled from 'styled-components';

export const PageButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background-color: #272727;
  color: white;
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