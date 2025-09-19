import Banner from '../components/Banner/Banner'
import banner from '../assets/banner.png'
import { useContext } from 'react'
import { GlobalContext } from '../components/context/GlobalContext'
import Imagen from '../components/Galeria/Imagen'
import styled from 'styled-components'
import ContenidoSeccion from '../components/Containers/ContenidoSeccion'
import Titulo from '../components/Galeria/Titulo'
import ImagenesContainer from '../components/Containers/ImagenesContainer'

const FlexibleContainer = styled.div`
  display: ${({ display }) => display || 'block'};
  flex-grow: ${({ flexGrow }) => flexGrow || 0};
`
const MasVistas = () => {
  const { state } = useContext(GlobalContext)
  return (
    <ContenidoSeccion>
      <Banner texto='Imágenes más vistas' backgroundImage={banner} />

      <FlexibleContainer>
        <Titulo>Imagenes mas vistas</Titulo>
        <ImagenesContainer>
          {state.fotosGaleria
            .filter((foto) => foto.vistas >= 500)
            .map((foto) => (
              <Imagen key={foto.id} imagen={foto} />
            ))}
        </ImagenesContainer>
      </FlexibleContainer>
    </ContenidoSeccion>
  )
}

export default MasVistas
