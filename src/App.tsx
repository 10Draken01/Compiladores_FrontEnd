import { DataProvider } from "./context/useDataContext"


function App() {

  return (
    <DataProvider>
      <div className="App">
        <h1>Compiladores FrontEnd</h1>
        <p>Bienvenido al compilador de lenguajes</p>
      </div>
    </DataProvider>
  )
}

export default App
