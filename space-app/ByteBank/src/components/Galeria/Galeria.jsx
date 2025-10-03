import styled from 'styled-components'
import Populares from './Populares'
import Tag from './tags/Tag'
import Titulo from './Titulo'
import Imagen from './Imagen'
import { useContext } from 'react'
import { GlobalContext } from '../context/GlobalContext'
import Cargando from '../Cargando/Cargando'
import ImagenesContainer from '../Containers/ImagenesContainer'
import AnimationPage from '../AnimationPage'

const GaleriaContainer = styled.div`
  display: flex;
`

const SeccionFluida = styled.section`
  flex-grow: 1;
`

const Galeria = () => {
  const { state } = useContext(GlobalContext)
  return state.fotosGaleria.length === 0 ? (
    <Cargando />
  ) : (
    <>
      <AnimationPage>
        <Tag />
        <GaleriaContainer>
          <SeccionFluida>
            <Titulo>Navegue por la galería</Titulo>
            <ImagenesContainer>
              {state.fotosGaleria.map((foto) => (
                <Imagen key={foto.id} imagen={foto} />
              ))}
            </ImagenesContainer>
          </SeccionFluida>

          <Populares fotos={state.fotosGaleria} />
        </GaleriaContainer>
      </AnimationPage>
    </>
  )
}

export default Galeria
