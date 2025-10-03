import { createContext } from 'react'
import { IFiltrosContext } from '../../interfaces/IFiltrosContext'

const FiltrosContext = createContext<IFiltrosContext>({
  filtro: '',
  filtrarTareas: () => {},
  finalizadas: false,
  mostrarFinalizadas: () => {},
})

export default FiltrosContext
