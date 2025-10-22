import Banner from '../components/Banner/Banner'
import banner from '../assets/banner.png'
import { useContext } from 'react'
import { GlobalContext } from '../components/context/GlobalContext'
import Imagen from '../components/Galeria/Imagen'
import styled from 'styled-components'
import ContenidoSeccion from '../components/Containers/ContenidoSeccion'
import Titulo from '../components/Galeria/Titulo'
import ImagenesContainer from '../components/Containers/ImagenesContainer'
import isNewFoto from '../utils/isNewFoto'

const FlexibleContainer = styled.div`
  display: ${({ display }) => display || 'block'};
  flex-grow: ${({ flexGrow }) => flexGrow || 0};
`
const Nuevas = () => {
  const { state } = useContext(GlobalContext)
  return (
    <ContenidoSeccion>
      <Banner texto='Imagenes recientes' backgroundImage={banner} />

      <FlexibleContainer>
        <Titulo>Recientes</Titulo>
        <ImagenesContainer>
          {state.fotosGaleria
            .filter((foto) => isNewFoto(foto.fecha))
            .map((foto) => (
              <Imagen key={foto.id} imagen={foto} />
            ))}
        </ImagenesContainer>
      </FlexibleContainer>
    </ContenidoSeccion>
  )
}

export default Nuevas
