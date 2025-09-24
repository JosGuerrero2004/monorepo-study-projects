import { useContext } from 'react'
import { GlobalContext } from './context/GlobalContext'
import { Navigate, Outlet } from 'react-router'

const RouteProtector = () => {
  const { state } = useContext(GlobalContext)
  if (!state.auth) {
    return <Navigate to='/login' replace />
  }
  return <Outlet />
}

export default RouteProtector
