import styled from 'styled-components'
import GlobalStyles from './components/GlobalStyles'
import Cabecera from './components/Cabecera'
import BarraLateral from './components/BarraLateral'
import ModalZoom from './components/Galeria/ModalZooom/ModalZoom'
import GlobalContextProvider from './components/context/GlobalContext'
import Home from './views/Home'
import { Route, Routes } from 'react-router'
import MasVistas from './views/MasVistas'
import Favoritos from './views/Favoritos'
import Nuevas from './views/Nuevas'
import Sorprendeme from './views/Sorprendeme'
import GaleriaLayout from './components/GaleriaLayout'
import DetalleImagen from './views/DetalleImagen'

const FondoGradiente = styled.div`
  background: linear-gradient(
    174.61deg,
    #041833 4.16%,
    #04244f 48%,
    #154580 96.76%
  );
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

function App() {
  return (
    <>
      <FondoGradiente>
        <GlobalContextProvider>
          <GlobalStyles />
          <AppContainer>
            <Cabecera />
            <MainContainer>
              <BarraLateral />
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/galeria' element={<GaleriaLayout />}>
                  <Route path='mas-vistas' element={<MasVistas />} />
                  <Route path='favoritos' element={<Favoritos />} />
                  <Route path='nuevas' element={<Nuevas />} />
                  <Route path='sorprendeme' element={<Sorprendeme />} />
                </Route>
                <Route path='/foto/:id' element={<DetalleImagen />} />{' '}
              </Routes>{' '}
            </MainContainer>
          </AppContainer>
          <ModalZoom />
        </GlobalContextProvider>
      </FondoGradiente>
    </>
  )
}

export default App
