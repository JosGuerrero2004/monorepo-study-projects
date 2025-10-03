import { ReactNode, useReducer } from 'react'
import ITarea from '../../interfaces/ITarea'
import TareaContext from '../Tarea/TareaContext'
import { fetchDataAPI } from '../../services/ApiService'
import { toast } from 'react-toastify'
import { tareasReducer } from '../../redusers/TareasReducer'

type Props = { children: ReactNode }

const TareasProvider = ({ children }: Props) => {
  const ApiURL = 'http://localhost:3000/tareas'
  const [state, dispatch] = useReducer(tareasReducer, { tareas: [] })

  const cargarTareas = (tareas: ITarea[]) => {
    dispatch({ type: 'CARGAR_TAREAS', payload: tareas })
  }
  const agregarTarea = async (tarea: ITarea) => {
    const res = await fetchDataAPI<ITarea>(ApiURL, 'POST', tarea)
    if (res.error) {
      toast(res.error)
    } else {
      dispatch({ type: 'AGREGAR_TAREA', payload: tarea })
    }
  }

  const onFinalizar = async (id: string) => {
    const endPoint = `${ApiURL}/${id}`
    const res = await fetchDataAPI<ITarea>(endPoint, 'PATCH', { estado: 'Finalizado' })

    if (res.error) {
      toast(res.error)
    } else {
      dispatch({ type: 'FINALIZAR_TAREA', payload: id })
    }
  }

  const onEliminar = async (id: string) => {
    const endPoint = `${ApiURL}/${id}`
    const res = await fetchDataAPI<ITarea>(endPoint, 'DELETE')

    if (res.error) {
      toast(res.error)
    } else {
      dispatch({ type: 'ELIMINAR_TAREA', payload: id })
    }
  }

  return (
    <TareaContext.Provider
      value={{
        tareas: state.tareas,
        cargarTareas,
        onEliminar,
        onFinalizar,
        ApiURL,
        agregarTarea,
      }}
    >
      {children}
    </TareaContext.Provider>
  )
}

export default TareasProvider
