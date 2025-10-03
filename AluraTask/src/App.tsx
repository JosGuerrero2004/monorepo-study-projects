import { ToastContainer } from 'react-toastify'
import './App.css'
import Home from './views/Home'
import TareasProvider from './context/Tarea/TareasProvider'
import FiltrosProvider from './context/Filtros/FiltrosProvider'

function App() {
  return (
    <>
      <TareasProvider>
        <FiltrosProvider>
          <Home />
          <ToastContainer />
        </FiltrosProvider>
      </TareasProvider>
    </>
  )
}

export default App
