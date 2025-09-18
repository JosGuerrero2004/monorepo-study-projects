import { Link } from 'react-router';
import styled from 'styled-components';

const LiStyled = styled.li`
  font-size: 24px;
  margin-bottom: 30px;
  line-height: 28px;
  display: flex;
  align-items: center;
  gap: 16px;
  color: ${(props) => (props.$activo ? '#7B78E5' : '#D9D9D9')};
  font-family: ${(props) =>
    props.$activo ? 'GandhiSansBold' : 'GandhiSansRegular'};
`;

const StyledLink = styled(Link)`
  font-size: 24px;
  margin-bottom: 10px;
  line-height: 10px;
  display: flex;
  align-items: center;
  gap: 4px;
  text-decoration: none;
  color: inherit;
`;

const ItemNavegacion = ({
  children,
  iconoActivo,
  iconoInactivo,
  activo = false,
  link,
}) => {
  return (
    <LiStyled $activo={activo}>
      <StyledLink to={link}>
        <img src={activo ? iconoActivo : iconoInactivo} alt={children} />
        {children}
      </StyledLink>
    </LiStyled>
  );
};
export default ItemNavegacion;
