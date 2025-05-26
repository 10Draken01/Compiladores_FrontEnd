import styled from 'styled-components';

export const ErrorBadge = styled.span<{ $hasErrors: boolean }>`
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: bold;
  background-color: ${props => props.$hasErrors ? '#ff4444' : '#44ff44'};
  color: white;
`;