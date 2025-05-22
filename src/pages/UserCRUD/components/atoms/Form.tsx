import styled from 'styled-components';

export const Form = styled.form`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-evenly;
    width: 100%;
    box-sizing: border-box;
    background-color: #3a3a3a;
    border-radius: .5rem;
    gap: 1rem;
    padding: 1rem;

    div{
        width: calc((100% / 3) - 0.7rem);
        display: flex;
        box-sizing: border-box;
        flex-direction: column;
        gap: 0.5rem;
    }
`;