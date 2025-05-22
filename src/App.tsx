import { DataProvider } from "./context/useDataContext"
import { UserCRUD } from "./Pages/UserCrud/UserCRUD"


function App() {

  return (
    <DataProvider>
      <UserCRUD/>
    </DataProvider>
  )
}

export default App
