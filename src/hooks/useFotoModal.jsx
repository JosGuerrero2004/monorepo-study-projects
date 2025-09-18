import { useContext } from 'react'
import { GlobalContext } from '../components/context/GlobalContext'

function useFotoModal () {
  const { state, dispatch } = useContext(GlobalContext)
  const abrirModal = (foto) => {
    dispatch({ type: 'SET_FOTO_SELECCIONADA', payload: foto })
  }
  const cerrarModal = () => {
    dispatch({ type: 'SET_FOTO_SELECCIONADA', payload: null })
  }

  const fotoSeleccionada = state.fotoSeleccionada
  const isOpenModal = state.modalAbierto

  return { fotoSeleccionada, isOpenModal, abrirModal, cerrarModal }
}

export default useFotoModal
