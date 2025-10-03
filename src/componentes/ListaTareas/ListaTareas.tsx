import { useCallback, useEffect, useRef } from 'react'
import './ListaTareas.css'
import ITarea from '../../interfaces/ITarea'
import Tarea from '../Tarea/Tarea'
import Formulario from '../Formulario/Formulario'
import { saveToLocalStorage } from '../../utils/LocalStorage'
import { toast } from 'react-toastify'
import { fetchDataAPI } from '../../services/ApiService'
import { useTareasContext } from '../../context/Tarea/useTareasContext'
import { useFiltrosContext } from '../../context/Filtros/useFiltrosContext'

const ListaTareas = () => {
  const creacionComponente = useRef<boolean>(true)
  const { ApiURL, tareas, setTareas } = useTareasContext()
  const { filtro, finalizadas } = useFiltrosContext()

  const cargarTareasAPI = useCallback(async () => {
    const res = await fetchDataAPI<ITarea[]>(ApiURL)

    if (res.error) {
      toast(res.error)
    } else {
      setTareas(() => {
        return res.data!.map((tarea: ITarea) => {
          return {
            ...tarea,
            fecha: new Date(tarea.fecha),
          }
        })
      })
    }
  }, [ApiURL, setTareas])

  useEffect(() => {
    if (creacionComponente.current) {
      creacionComponente.current = false
      cargarTareasAPI()
      return
    }

    saveToLocalStorage({ key: 'tareas', value: tareas })
    toast('Tareas actualizadas')
  }, [tareas, cargarTareasAPI])

  const tareasFiltradas: ITarea[] = tareas.filter((tarea: ITarea) => {
    return (
      (tarea.nombre.toLowerCase().includes(filtro.toLowerCase()) || filtro === '') &&
      (!finalizadas || tarea.estado === 'Finalizado')
    )
  })

  return (
    <>
      <div className='formWrapper'>
        <h2>Creación de Tareas</h2>
        <Formulario />
      </div>

      <hr />
      <div id='task-form'>
        <h2>Lista de Tareas</h2>
        <ul id='tasks'>
          {tareasFiltradas.map((tarea: ITarea, index: number) => (
            <Tarea tarea={tarea} key={tarea.id} index={index} />
          ))}
        </ul>
      </div>
    </>
  )
}

export default ListaTareas
