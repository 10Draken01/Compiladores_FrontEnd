import styled from 'styled-components';

export const ButtonForm = styled.button`
    width: fit-content;
    padding: 1rem 2rem;
    border-radius: 0.4rem;
    border: none;
    background-color: #272727;
    box-sizing: border-box;
    color: white;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    // box-Shadow con sombreado para afuera neon
    box-shadow: 0 0 5px rgba(255, 255, 255, 0.849);

    &:hover {
        background-color: #3f3f3f;
    }

    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
`;