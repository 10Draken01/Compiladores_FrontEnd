import styled from 'styled-components';

export const InputForm = styled.input`
    width: 100%;
    padding: .4rem;
    box-sizing: border-box;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 16px;
    &:focus {
        outline: none;
        border-color: #007bff;
        box-shadow: 0 0 5px rgba(0,123,255,.5);
    }
`;