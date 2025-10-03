import { useContext } from 'react'
import { GlobalContext } from './context/GlobalContext'
import Cargando from './Cargando/Cargando'
import { Outlet } from 'react-router'

const GaleriaLayout = () => {
  const { state } = useContext(GlobalContext)
  return state.fotosGaleria.length === 0 ? <Cargando /> : <Outlet />
}

export default GaleriaLayout
