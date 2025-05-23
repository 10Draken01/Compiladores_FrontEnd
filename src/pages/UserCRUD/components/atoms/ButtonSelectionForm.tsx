import styled from 'styled-components';

export const ButtonSelectionForm = styled.button<{ $selected: boolean }>`
    width: 100%;
    padding: 1rem;
    border-radius: .4rem;
    border: none;
    background-color: #272727;
    color: 'white';
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    // box-Shadow con sombreado para adentro
    box-shadow: ${({ $selected }) => ($selected ? 'inset 0 0 5px rgba(0, 0, 0, 0.849)' : '0 0 5px rgba(255, 255, 255, 0.849)')};

    &:hover {
        background-color: #272727;
        color: white;
    }

    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
`;