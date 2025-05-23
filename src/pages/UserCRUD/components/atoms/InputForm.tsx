import styled from 'styled-components';

export const InputForm = styled.input`
    width: 100%;
    padding: .4rem;
    box-sizing: border-box;
    border-radius: 5px;
    border: none;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.849);
    font-size: 16px;
    &:focus {
        outline: none;
        border-color: #ffffff;
        box-shadow: 0 0 5px rgba(255, 255, 255, 0.849);
    }
`;