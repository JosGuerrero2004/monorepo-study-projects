export interface IFiltrosContext {
  filtro: string
  filtrarTareas: (valor: string) => void
  finalizadas: boolean
  mostrarFinalizadas: () => void
}
