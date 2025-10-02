import { useEffect, useRef, useState } from 'react'
import './ListaTareas.css'
import ITarea from '../../interfaces/ITarea'
import Tarea from '../Tarea/Tarea'
import Formulario from '../Formulario/Formulario'
import { saveToLocalStorage } from '../../utils/LocalStorage'
import { toast } from 'react-toastify'
import { fetchDataAPI } from '../../services/ApiService'
interface IProps {
  filtro: string
  finalizadas: boolean
}

const ListaTareas = ({ filtro, finalizadas }: IProps) => {
  const ApiURL = 'http://localhost:3000/tareas'
  const creacionComponente = useRef<boolean>(true)
  const [tareas, setTareas] = useState<ITarea[]>([])
  const cargarTareasAPI = async () => {
    const res = await fetchDataAPI<ITarea[]>(ApiURL)

    if (res.error) {
      toast(res.error)
    } else {
      setTareas(
        res.data
          ? res.data.map((tarea: ITarea) => {
              return {
                ...tarea,
                fecha: new Date(tarea.fecha),
              }
            })
          : []
      )
    }
  }

  useEffect(() => {
    if (creacionComponente.current) {
      creacionComponente.current = false
      cargarTareasAPI()
      return
    }

    saveToLocalStorage({ key: 'tareas', value: tareas })
    toast('Tareas actualizadas')
  }, [tareas])

  const tareasFiltradas: ITarea[] = tareas.filter((tarea: ITarea) => {
    return (
      (tarea.nombre.toLowerCase().includes(filtro.toLowerCase()) || filtro === '') &&
      (!finalizadas || tarea.estado === 'Finalizado')
    )
  })

  const agregarTarea = async (tarea: ITarea) => {
    const res = await fetchDataAPI<ITarea>(ApiURL, 'POST', tarea)
    if (res.error) {
      toast(res.error)
    } else {
      setTareas([...tareas, tarea])
    }
  }

  const onFinalizar = async (id: string) => {
    const endPoint = `${ApiURL}/${id}`
    const res = await fetchDataAPI<ITarea>(endPoint, 'PATCH', { estado: 'Finalizado' })

    if (res.error) {
      toast(res.error)
    } else {
      setTareas((prev) =>
        prev.map((tarea) => (tarea.id === id ? { ...tarea, estado: 'Finalizado' } : tarea))
      )
    }
  }

  const onEliminar = async (id: string) => {
    const endPoint = `${ApiURL}/${id}`
    const res = await fetchDataAPI<ITarea>(endPoint, 'DELETE')

    if (res.error) {
      toast(res.error)
    } else {
      setTareas((prev) => prev.filter((tarea) => tarea.id !== id))
    }
  }

  return (
    <>
      <div className='formWrapper'>
        <h2>Creación de Tareas</h2>
        <Formulario onSubmit={agregarTarea} />
      </div>

      <hr />
      <div id='task-form'>
        <h2>Lista de Tareas</h2>
        <ul id='tasks'>
          {tareasFiltradas.map((tarea: ITarea, index: number) => (
            <Tarea
              tarea={tarea}
              key={tarea.id}
              index={index}
              onFinalizar={onFinalizar}
              onEliminar={onEliminar}
            />
          ))}
        </ul>
      </div>
    </>
  )
}

export default ListaTareas
