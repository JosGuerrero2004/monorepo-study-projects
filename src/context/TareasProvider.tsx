import { ReactNode, useState } from 'react'
import ITarea from '../interfaces/ITarea'
import TareaContext from './TareaContext'

type Props = { children: ReactNode }

const TareasProvider = ({ children }: Props) => {
  const [tareas, setTareas] = useState<ITarea[]>([])
  const [finalizadas, setFinalizadas] = useState<boolean>(false)
  const [filtro, setFiltro] = useState<string>('')
  return (
    <TareaContext.Provider
      value={{
        tareas,
        setTareas,
        finalizadas,
        setFinalizadas,
        filtro,
        setFiltro,
      }}
    >
      {children}
    </TareaContext.Provider>
  )
}

export default TareasProvider
