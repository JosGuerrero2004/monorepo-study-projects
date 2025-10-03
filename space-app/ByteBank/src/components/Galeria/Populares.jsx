import styled from 'styled-components'
import Titulo from './Titulo'

const ColumnaFotos = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const Img = styled.img`
  max-width: 212px;
  border-radius: 20px;
`

const Boton = styled.button`
  background-color: transparent;
  color: #fff;
  border: 2px solid;
  border-color: #c98cf1;
  padding: 12px 20px;
  font-size: 20px;
  border-radius: 10px;
  cursor: pointer;
  width: 100%;
  margin-top: 16px;
`

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  margin-left: 16px;
`

const Populares = ({ fotos }) => {
  return (
    <StyledSection>
      <Titulo $align='center'>Populares</Titulo>
      <ColumnaFotos>
        {fotos.map((foto) => (
          <Img key={foto.id} src={foto.path} alt={foto.titulo} />
        ))}
      </ColumnaFotos>
      <Boton>Ver más</Boton>
    </StyledSection>
  )
}

export default Populares
