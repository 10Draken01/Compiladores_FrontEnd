import styled from 'styled-components';

export const TableClientesContainer = styled.table`
    width: 80vw;
    min-width: 700px; /* Ancho mínimo para evitar que se comprima demasiado */
    border-collapse: collapse;
    box-sizing: border-box;
    background-color: white;
    border-radius: 0.5rem;
    table-layout: fixed; /* Hace que la tabla respete los anchos definidos */
    
    /* Aplicar box-sizing a todos los elementos de la tabla */
    *, *::before, *::after {
        box-sizing: border-box;
    }

`;