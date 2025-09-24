import { useContext } from 'react'
import { useParams } from 'react-router'
import { GlobalContext } from '../components/context/GlobalContext'
import styled from 'styled-components'
import FotoDetalle from '../components/FotoDetalle'

const DetalleImagenContainer = styled.section`
  display: flex;
  flex-grow: 1;
`
const DetalleImg = styled.img`
  border-radius: 12px;
  max-width: 100%;
  min-width: 50%;
  object-fit: "contain";
  height = "auto";
`

const DetalleImagen = () => {
  const { id } = useParams()
  const { state } = useContext(GlobalContext)

  const foto = state.fotosGaleria.find((foto) => Number(foto.id) === Number(id))

  if (!foto) return <h3>Foto no válida</h3>

  return (
    <DetalleImagenContainer>
      <DetalleImg src={foto.path} alt={foto.alt} />
      <FotoDetalle foto={foto} />
    </DetalleImagenContainer>
  )
}

export default DetalleImagen
