import styled from 'styled-components'
import BotonIcono from './BotonIcono'
import { useContext } from 'react'
import { GlobalContext } from '../context/GlobalContext'
import useFotoModal from '../../hooks/useFotoModal'

const Figure = styled.figure`
  width: ${(props) => (props.$expandida ? '90%' : '460px')};
  max-width: 100%;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-self: center;
  align-self: center;
flex-shrink: 0;

  & > img {
    max-width: 100%;
    border-radius: 20px 20px 0px 0px;
    display: block;
  }

  figcaption {
    background-color: #001634;
    border-radius: 0px 0px 20px 20px;
    color: white;
    box-sizing: border-box;
    padding: 12px;
    h3 {
        font-family: 'GandhiSansBold';
    }
    h4 {
        flex-grow: 1;
    }
    h3,
    h4 {
        margin: 0;
        font-size: 16px;
    }   
  }
`

const Pie = styled.footer`
display: flex;
justify-content: space-between;
align-items: center;
padding: 12px 0;
`

const Imagen = ({ imagen, expandida = false }) => {
  const { abrirModal } = useFotoModal()
  const { dispatch } = useContext(GlobalContext)

  return (
    <Figure $expandida={expandida} id={`foto-${imagen.id}`}>
      <img src={imagen.path} alt={imagen.titulo} />
      <figcaption>
        <h3>{imagen.titulo}</h3>
        <Pie>
          <h4>{imagen.fuente}</h4>
          <BotonIcono onClick={() => dispatch({ type: 'ALTERNAR_FAVORITO', payload: imagen })} aria-pressed={imagen.favorito}>
            <img src={imagen.favorito ? '/iconos/favorito-activo.png' : '/iconos/favorito.png'} alt='Iconono de favorito' />
          </BotonIcono>
          {!expandida &&
            <BotonIcono aria-hidden={expandida} onClick={() => abrirModal(imagen)}>
              <img src='/iconos/expandir.png' alt='Iconono de expandir' />
            </BotonIcono>}

        </Pie>

      </figcaption>
    </Figure>
  )
}

export default Imagen
