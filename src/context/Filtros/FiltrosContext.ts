import { createContext } from 'react'
import { IFiltrosContext } from '../../interfaces/IFiltrosContext'

const FiltrosContext = createContext<IFiltrosContext>({
  filtro: '',
  setFiltro: () => {},
  finalizadas: false,
  setFinalizadas: () => {},
})

export default FiltrosContext
