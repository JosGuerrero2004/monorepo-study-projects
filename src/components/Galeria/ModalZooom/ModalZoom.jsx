import styled from 'styled-components'
import Imagen from '../Imagen'
import BotonIcono from '../BotonIcono'
import { useContext } from 'react'
import { GlobalContext } from '../../context/GlobalContext'
import useFotoModal from '../../../hooks/useFotoModal'
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`

const StyledDialog = styled.dialog`
  display:flex;
  top: 50%;
  left: 50%;
  transform: translate(-45%, -50%);
  justify-content: center;
  margin: 0;
  padding: 0;
  border: none;
  background: transparent;
  max-width: 1156px;
  max-height: 90vh;
  width: 100%;
  height: auto;

  form {
    button {
      position:relative;
      top: 20px;
      right: 60px;
    }
  }
`

const ModalZoom = () => {
  const { isOpenModal, fotoSeleccionada, cerrarModal} = useFotoModal()
  return (
    <>
      {
        isOpenModal &&
          <>
            <Overlay>
              <StyledDialog open={!!fotoSeleccionada} onClose={() => cerrarModal()}>
                <Imagen expandida imagen={fotoSeleccionada} />
                <form method='dialog'>
                  <BotonIcono formMethod='dialog'>
                    <img src='/iconos/cerrar.png' alt='icono de cerrar' />
                  </BotonIcono>

                </form>

              </StyledDialog>
            </Overlay>

          </>
      }
    </>
  )
}

export default ModalZoom
