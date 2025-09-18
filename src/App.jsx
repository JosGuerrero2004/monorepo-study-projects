import styled from 'styled-components'
import GlobalStyles from './components/GlobalStyles'
import Cabecera from './components/Cabecera'
import BarraLateral from './components/BarraLateral'
import Banner from './components/Banner/Banner'
import banner from './assets/banner.png'
import Galeria from './components/Galeria/Galeria'
import ModalZoom from './components/Galeria/ModalZooom/ModalZoom'
import GlobalContextProvider from './components/context/GlobalContext'

const FondoGradiente = styled.div`
  background: linear-gradient(174.61deg, #041833 4.16%, #04244F 48%, #154580 96.76%);
  width: 100%;
  min-height: 100vh;
`

const AppContainer = styled.div`
  width: 80%;
  max-width: 100%;
  margin: 0 auto;
`

const MainContainer = styled.main`
  display: flex;
  gap: 32px;
`

const ContenedorGaleria = styled.section`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 24px;
`

function App () {
  return (
    <>
      <FondoGradiente>
        <GlobalContextProvider>
          <GlobalStyles />
          <AppContainer>
            <Cabecera />
            <MainContainer>
              <BarraLateral />
              <ContenedorGaleria>
                <Banner texto='La galería mas fachera del mundo' backgroundImage={banner} />
                <Galeria />
              </ContenedorGaleria>
            </MainContainer>
          </AppContainer>
          <ModalZoom />
        </GlobalContextProvider>
      </FondoGradiente>
    </>
  )
}

export default App
