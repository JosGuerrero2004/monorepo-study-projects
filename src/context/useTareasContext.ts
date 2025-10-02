import { useContext } from 'react'
import { TareaContext } from './TareaContext'

export const useTareasContext = () => {
  const context = useContext(TareaContext)
  if (!context) {
    throw new Error('useTareasContext debe usarse dentro de un TareasProvider')
  }

  return context
}
