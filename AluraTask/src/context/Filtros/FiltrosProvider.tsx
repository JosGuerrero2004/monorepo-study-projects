import { ReactNode, useReducer } from 'react'
import { IFiltrosContext } from '../../interfaces/IFiltrosContext'
import FiltrosContext from './FiltrosContext'
import { filtrosReducer, FiltrosState } from '../../redusers/FiltrosReducer'

type Props = { children: ReactNode }

const initialState: FiltrosState = {
  filtro: '',
  finalizadas: false,
}
const FiltrosProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(filtrosReducer, initialState)
  const filtrarTareas = (filtro: string) => {
    dispatch({ type: 'FILTRAR_TAREAS', payload: filtro })
  }

  const mostrarFinalizadas = () => {
    dispatch({ type: 'MOSTRAR_FINALIZADAS' })
  }

  const objProvider: IFiltrosContext = {
    finalizadas: state.finalizadas,
    filtrarTareas,
    filtro: state.filtro,
    mostrarFinalizadas,
  }
  return <FiltrosContext.Provider value={objProvider}>{children}</FiltrosContext.Provider>
}

export default FiltrosProvider
