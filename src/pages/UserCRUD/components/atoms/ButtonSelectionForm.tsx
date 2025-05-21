import styled from 'styled-components';

export const ButtonSelectionForm = styled.button<{ $selected: boolean }>`
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: none;
    background-color: ${({ $selected }) => ($selected ? '#007bff' : '#ccc')};
    color: white;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #0056b3;
    }

    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
`;