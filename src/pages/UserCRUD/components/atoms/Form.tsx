import styled from 'styled-components';

export const Form = styled.form`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    box-sizing: border-box;
    gap: 1rem;
    padding: 1rem;

    div{
        width: 49%;
        display: flex;
        box-sizing: border-box;
        flex-direction: column;
        gap: 0.5rem;
    }
    .BtnForm{
        width:100%;
        justify-content: center;
        align-items: center;
    }
`;