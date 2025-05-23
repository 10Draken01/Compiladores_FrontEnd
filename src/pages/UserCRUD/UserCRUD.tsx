

import { Container } from "./components/atoms/Container";
import ClienteTable from "./components/organims/ClienteTable";
import { FormsUser } from "./components/organims/FormsUser";



export function UserCRUD() {
    return (
        <Container>
            <FormsUser/>
            <ClienteTable/>
        </Container>
    );
}