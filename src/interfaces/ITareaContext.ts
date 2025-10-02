import ITarea from './ITarea'

export interface ITareaContext {
  filtro: string
  setFiltro: (valor: string) => void
  finalizadas: boolean
  setFinalizadas: (valor: boolean) => void
  tareas: ITarea[]
  setTareas: (valor: ITarea[]) => void
}
