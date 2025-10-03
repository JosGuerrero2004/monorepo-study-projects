import ITarea from './ITarea'

export interface ITareaContext {
  ApiURL: string
  tareas: ITarea[]
  cargarTareas: (tareas: ITarea[]) => void
  agregarTarea: (tarea: ITarea) => Promise<void>
  onFinalizar: (id: string) => Promise<void>
  onEliminar: (id: string) => Promise<void>
}
