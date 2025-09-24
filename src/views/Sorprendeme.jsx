import Banner from '../components/Banner/Banner'
import banner from '../assets/banner.png'
import { useContext } from 'react'
import { GlobalContext } from '../components/context/GlobalContext'
import Imagen from '../components/Galeria/Imagen'
import styled from 'styled-components'
import ContenidoSeccion from '../components/Containers/ContenidoSeccion'
import Titulo from '../components/Galeria/Titulo'
import ImagenesContainer from '../components/Containers/ImagenesContainer'
import RandomizeId from '../utils/RandomizeId'
import AnimationPage from '../components/AnimationPage'

const FlexibleContainer = styled.div`
  display: ${({ display }) => display || 'block'};
  flex-grow: ${({ flexGrow }) => flexGrow || 0};
`
const Sorprendeme = () => {
  const { state } = useContext(GlobalContext)
  const randomId = RandomizeId(1, state.fotosGaleria.length)
  console.log(randomId)
  return (
    <AnimationPage>
      <ContenidoSeccion>
        <Banner texto='¡Sorprendeme!' backgroundImage={banner} />

        <FlexibleContainer>
          <Titulo>Las que te sorprenderán</Titulo>
          <ImagenesContainer>
            {state.fotosGaleria
              .filter((foto) => Number(foto.id) === randomId)
              .map((foto) => (
                <Imagen key={foto.id} imagen={foto} />
              ))}
          </ImagenesContainer>
        </FlexibleContainer>
      </ContenidoSeccion>
    </AnimationPage>
  )
}

export default Sorprendeme
