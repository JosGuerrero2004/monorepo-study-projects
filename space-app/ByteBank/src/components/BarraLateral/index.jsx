import styled from 'styled-components'
import ItemNavegacion from './ItemNavegacion'
import { useContext } from 'react'
import { GlobalContext } from '../context/GlobalContext'

const ListaEstillizada = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`

const BarraLateral = () => {
  const { state } = useContext(GlobalContext)
  return (
    <aside>
      <nav>
        <ListaEstillizada>
          <ItemNavegacion
            iconoActivo='/iconos/home-activo.png'
            iconoInactivo='/iconos/home-inactivo.png'
            link='/'
          >
            Inicio
          </ItemNavegacion>
          {!state.auth && (
            <ItemNavegacion
              iconoActivo='/iconos/login-activo.png'
              iconoInactivo='/iconos/login-inactivo.png'
              link='/login'
            >
              Ingresar
            </ItemNavegacion>
          )}
          {state.auth && (
            <>
              <ItemNavegacion
                iconoActivo='/iconos/mas-vistas-activo.png'
                iconoInactivo='/iconos/mas-vistas-inactivo.png'
                link='/galeria/mas-vistas'
              >
                Más vistas
              </ItemNavegacion>
              <ItemNavegacion
                iconoActivo='/iconos/me-gusta-activo.png'
                iconoInactivo='/iconos/me-gusta-inactivo.png'
                link='/galeria/favoritos'
              >
                Favoritos
              </ItemNavegacion>
              <ItemNavegacion
                iconoActivo='/iconos/nuevas-activo.png'
                iconoInactivo='/iconos/nuevas-inactivo.png'
                link='/galeria/nuevas'
              >
                Nuevas
              </ItemNavegacion>
              <ItemNavegacion
                iconoActivo='/iconos/sorprendeme-activo.png'
                iconoInactivo='/iconos/sorprendeme-inactivo.png'
                link='/galeria/sorprendeme'
              >
                Sorpréndeme
              </ItemNavegacion>
              {state.auth && (
                <ItemNavegacion
                  iconoActivo='/iconos/logout-activo.png'
                  iconoInactivo='/iconos/logout-inactivo.png'
                  link='/login'
                >
                  Salir
                </ItemNavegacion>
              )}
            </>
          )}
        </ListaEstillizada>
      </nav>
    </aside>
  )
}

export default BarraLateral
