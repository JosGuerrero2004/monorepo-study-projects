import { useContext } from 'react'
import FiltrosContext from './FiltrosContext'

export const useFiltrosContext = () => {
  const context = useContext(FiltrosContext)
  if (!context) {
    throw new Error('useFiltrosContext debe usarse dentro de un FiltrosProvider')
  }

  return context
}
