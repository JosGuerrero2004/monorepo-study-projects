import styled from 'styled-components'

const ImagenesContainerStyled = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 24px;
`
const ImagenesContainer = ({ children }) => {
  return <ImagenesContainerStyled>{children}</ImagenesContainerStyled>
}

export default ImagenesContainer
