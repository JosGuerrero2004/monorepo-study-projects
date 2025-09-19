import Banner from '../components/Banner/Banner'
import banner from '../assets/banner.png'
import Galeria from '../components/Galeria/Galeria'
import ContenidoSeccion from '../components/Containers/ContenidoSeccion'

const Home = () => {
  return (
    <ContenidoSeccion>
      <Banner
        texto='La galería mas fachera del mundo'
        backgroundImage={banner}
        height='328px'
      />
      <Galeria />
    </ContenidoSeccion>
  )
}

export default Home
