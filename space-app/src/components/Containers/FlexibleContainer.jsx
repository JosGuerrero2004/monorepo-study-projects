import styled from 'styled-components'

const FlexibleContainerStyled = styled.div`
  display: ${({ display }) => display || 'block'};
  flex-grow: ${({ flexGrow }) => flexGrow || 0};
`
const FlexibleContainer = ({ children }) => {
  return <FlexibleContainerStyled>{children}</FlexibleContainerStyled>
}

export default FlexibleContainer
