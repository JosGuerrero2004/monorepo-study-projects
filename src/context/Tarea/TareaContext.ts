import { createContext } from 'react'
import { ITareaContext } from '../../interfaces/ITareaContext'

const TareaContext = createContext<ITareaContext>({
  ApiURL: '',
  tareas: [],
  setTareas: () => {},
  agregarTarea: async () => {},
  onFinalizar: async () => {},
  onEliminar: async () => {},
})

export default TareaContext
