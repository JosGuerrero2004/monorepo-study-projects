import './Home.css'
import Navbar from '../componentes/Navbar/Navbar'
import ListaTareas from '../componentes/ListaTareas/ListaTareas'

interface IHomeProps {
  titulo?: string
}

const Home = ({ titulo = 'AluraTask' }: IHomeProps) => {
  return (
    <>
      <Navbar titulo={titulo} />
      <section className='main'>
        <div className='container'>
          <div id='task-list'>
            <ListaTareas />
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
