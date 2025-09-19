import styled from 'styled-components'

const ContenedorGaleriaStyled = styled.section`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 24px;
`

const ContenidoSeccion = ({ children }) => {
  return <ContenedorGaleriaStyled>{children}</ContenedorGaleriaStyled>
}

export default ContenidoSeccion
