import { BrowserRouter, Route, Routes } from "react-router-dom"

import { store } from "./redux/store"
import { Provider } from "react-redux"
import Configuracion from "./paginas/Configuracion"
import Sorteo from "./paginas/Sorteo"

function App() {
 

  return (
    <>
      <BrowserRouter>
        <Provider store={store}>
          <Routes>
              <Route path="/" element={<Configuracion/>}/>
              <Route path="/sorteo" element={<Sorteo/>}/>
          </Routes>
        </Provider>
      </BrowserRouter>
      
    </>
  )
}

export default App
