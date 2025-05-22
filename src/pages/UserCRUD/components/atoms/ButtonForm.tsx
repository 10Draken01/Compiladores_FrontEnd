import styled from 'styled-components';

export const ButtonForm = styled.button`
    padding: 1rem 2rem;
    border-radius: 0.4rem;
    border: none;
    background-color: #007bff;
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