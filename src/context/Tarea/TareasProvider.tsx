import { ReactNode, useState } from 'react'
import ITarea from '../../interfaces/ITarea'
import TareaContext from '../Tarea/TareaContext'
import { fetchDataAPI } from '../../services/ApiService'
import { toast } from 'react-toastify'

type Props = { children: ReactNode }

const TareasProvider = ({ children }: Props) => {
  const ApiURL = 'http://localhost:3000/tareas'
  const [tareas, setTareas] = useState<ITarea[]>([])

  const agregarTarea = async (tarea: ITarea) => {
    const res = await fetchDataAPI<ITarea>(ApiURL, 'POST', tarea)
    if (res.error) {
      toast(res.error)
    } else {
      setTareas(() => [...tareas, tarea])
    }
  }

  const onFinalizar = async (id: string) => {
    const endPoint = `${ApiURL}/${id}`
    const res = await fetchDataAPI<ITarea>(endPoint, 'PATCH', { estado: 'Finalizado' })

    if (res.error) {
      toast(res.error)
    } else {
      setTareas((prev) =>
        prev!.map((tarea) => (tarea.id === id ? { ...tarea, estado: 'Finalizado' } : tarea))
      )
    }
  }

  const onEliminar = async (id: string) => {
    const endPoint = `${ApiURL}/${id}`
    const res = await fetchDataAPI<ITarea>(endPoint, 'DELETE')

    if (res.error) {
      toast(res.error)
    } else {
      setTareas((prev) => prev!.filter((tarea) => tarea.id !== id))
    }
  }

  return (
    <TareaContext.Provider
      value={{
        tareas,
        setTareas,
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
