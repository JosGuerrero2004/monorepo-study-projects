import { ReactNode, useState } from 'react'
import { IFiltrosContext } from '../../interfaces/IFiltrosContext'
import FiltrosContext from './FiltrosContext'

type Props = { children: ReactNode }

const FiltrosProvider = ({ children }: Props) => {
  const [filtro, setFiltro] = useState<string>('')
  const [finalizadas, setFinalizadas] = useState<boolean>(false)
  const objProvider: IFiltrosContext = {
    finalizadas,
    setFinalizadas,
    filtro,
    setFiltro,
  }
  return <FiltrosContext.Provider value={objProvider}>{children}</FiltrosContext.Provider>
}

export default FiltrosProvider
