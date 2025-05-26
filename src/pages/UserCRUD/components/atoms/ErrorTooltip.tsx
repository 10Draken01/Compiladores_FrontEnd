import React, { useState } from 'react';
import styled from 'styled-components';
import type { ClienteType } from '../../../../types/ClienteType';

interface ErrorTooltipProps {
  cliente: ClienteType;
  children: React.ReactNode;
}

const TooltipContainer = styled.div`
  width: fit-content;
  position: relative;
  display: inline-block;
`;

const TooltipContent = styled.div<{ $isVisible: boolean }>`
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background-color: #2d2d2d;
  color: white;
  padding: 12px 16px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  white-space: nowrap;
  z-index: 1000;
  min-width: 250px;
  max-width: 400px;
  white-space: normal;
  
  visibility: ${props => props.$isVisible ? 'visible' : 'hidden'};
  opacity: ${props => props.$isVisible ? '1' : '0'};
  transition: all 0.2s ease-in-out;
  
  /* Flecha del tooltip */
  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 6px solid transparent;
    border-top-color: #2d2d2d;
  }
`;

const ErrorTitle = styled.h4`
  margin: 0 0 8px 0;
  font-size: 14px;
  font-weight: 600;
  color: #ff6b6b;
  border-bottom: 1px solid #404040;
  padding-bottom: 6px;
`;

const ErrorList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const ErrorItem = styled.li`
  margin: 6px 0;
  padding: 6px 8px;
  background-color: #3a3a3a;
  border-radius: 4px;
  border-left: 3px solid #ff6b6b;
  font-size: 13px;
  line-height: 1.4;
`;

const ErrorCode = styled.span`
  font-weight: 600;
  color: #ffeb3b;
  margin-right: 8px;
`;

const ErrorMessage = styled.span`
  color: #e0e0e0;
`;

export function ErrorTooltip({ cliente, children }: ErrorTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  const hasErrors = cliente.Errores != null;

  if (!hasErrors) {
    return <>{children}</>;
  }

  const totalErrors = (Array.isArray(cliente.Errores?.Celular) ? cliente.Errores?.Celular.length : 0) + 
    (Array.isArray(cliente.Errores?.Email) ? cliente.Errores?.Email.length : 0) +
    (Array.isArray(cliente.Errores?.Nombre) ? cliente.Errores?.Nombre.length : 0);

  return (
    <TooltipContainer
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      <TooltipContent $isVisible={isVisible}>
        <ErrorTitle>
          Errores encontrados ({totalErrors})
        </ErrorTitle>
        <ErrorList>
          {
            cliente.Errores?.Nombre?.map((error, index) => (
              <ErrorItem key={index}>
                <ErrorCode>#{index + 1}</ErrorCode>
                <ErrorMessage>{error}</ErrorMessage>
              </ErrorItem>
            ))
          }
          {
            cliente.Errores?.Celular?.map((error, index) => (
              <ErrorItem key={index}>
                <ErrorCode>#{index + 1}</ErrorCode>
                <ErrorMessage>{error}</ErrorMessage>
              </ErrorItem>
            ))
          }
          {
            cliente.Errores?.Email?.map((error, index) => (
              <ErrorItem key={index}>
                <ErrorCode>#{index + 1}</ErrorCode>
                <ErrorMessage>{error}</ErrorMessage>
              </ErrorItem>
            ))
          }
        </ErrorList>
      </TooltipContent>
    </TooltipContainer>
  );
}