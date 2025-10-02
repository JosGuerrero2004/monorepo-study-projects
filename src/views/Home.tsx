import { useState } from 'react'
import './Home.css'
import Navbar from '../componentes/Navbar/Navbar'
import ListaTareas from '../componentes/ListaTareas/ListaTareas'

interface IHomeProps {
  titulo?: string
}

const Home = ({ titulo = 'AluraTask' }: IHomeProps) => {
  const [filtro, setFiltro] = useState<string>('')
  const [finalizadas, setFinalizadas] = useState<boolean>(false)
  return (
    <>
      <Navbar setFiltro={setFiltro} setFinalizadas={setFinalizadas} titulo={titulo} />
      <section className='main'>
        <div className='container'>
          <div id='task-list'>
            <ListaTareas filtro={filtro} finalizadas={finalizadas} />
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
