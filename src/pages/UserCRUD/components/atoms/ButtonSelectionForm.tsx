import styled from 'styled-components';

export const ButtonSelectionForm = styled.button<{ $selected: boolean }>`
    width: 100%;
    padding: 1rem;
    border-radius: .4rem;
    border: none;
    background-color: ${({ $selected }) => ($selected ? '#007bff' : '#ccc')};
    color: ${({ $selected }) => ($selected ? 'white' : '#575757')};;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #0056b3;
        color: white;
    }

    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
`;