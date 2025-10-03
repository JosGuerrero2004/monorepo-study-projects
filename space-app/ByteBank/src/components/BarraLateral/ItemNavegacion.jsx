import { NavLink } from 'react-router'
import styled from 'styled-components'

const LiStyled = styled.li`
  font-size: 24px;
  margin-bottom: 30px;
  line-height: 28px;
  display: flex;
  align-items: center;
  gap: 16px;
`

const StyledNavLink = styled(NavLink)`
  font-size: 24px;
  margin-bottom: 10px;
  line-height: 10px;
  display: flex;
  align-items: center;
  gap: 4px;
  text-decoration: none;
  color: inherit;
  &.active {
    color: #7b78e5;
    font-family: GandhiSansBold;
  }
  &:not(.active) {
    color: #d9d9d9;
    font-family: GandhiSansBold;
  }
`

const ItemNavegacion = ({ children, iconoActivo, iconoInactivo, link }) => {
  return (
    <LiStyled>
      <StyledNavLink
        to={link}
        className={({ isActive }) => (isActive ? 'active' : '')}
      >
        {({ isActive }) => (
          <>
            <img src={isActive ? iconoActivo : iconoInactivo} alt={children} />
            {children}
          </>
        )}
      </StyledNavLink>
    </LiStyled>
  )
}
export default ItemNavegacion
