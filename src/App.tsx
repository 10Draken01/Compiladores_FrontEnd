import { DataProvider } from "./context/useDataContext"
import { UserCRUD } from "./pages/UserCRUD/UserCRUD"


function App() {

  return (
    <DataProvider>
      <UserCRUD/>
    </DataProvider>
  )
}

export default App
