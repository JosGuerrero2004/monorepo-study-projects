import { createContext, useEffect, useReducer } from 'react'

export const GlobalContext = createContext()

const initialState = {
  todaslasFotos: [],
  fotosGaleria: [],
  fotoSeleccionada: null,
  tag: 0,
  filtro: '',
  modalAbierto: false
}

const reducer = (state, action) => {
    switch (action.type) {
    case 'SET_TAG':
      return { ...state, tag: action.payload }
    case 'SET_FOTOS':
      return { ...state, fotosGaleria: action.payload }
    case 'SET_FOTO_SELECCIONADA':
      return { ...state,
        fotoSeleccionada: action.payload,
        modalAbierto: action.payload != null ? true : false
      }
    case 'SET_TODAS_LAS_FOTOS':
      return { ...state, todaslasFotos: action.payload }
    case 'SET_FILTRO':
      return { ...state, filtro: action.payload }
    case 'ALTERNAR_FAVORITO':
      const fotosDeGaleria = state.fotosGaleria.map(fotoGaleria => {
        return {
          ...fotoGaleria,
          favorito: fotoGaleria.id === action.payload.id ? !fotoGaleria.favorito : fotoGaleria.favorito
        }
      })
      if (action.payload.id === state.fotoSeleccionada?.id) {
        return { ...state, fotosGaleria: fotosDeGaleria, fotoSeleccionada: { ...state.fotoSeleccionada, favorito: !state.fotoSeleccionada.favorito } }
      } else {
        return {
          ...state, fotosGaleria: fotosDeGaleria
        }
      }

    default:
      return state
  }
}

const GlobalContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const getData = async () => {
      const res = await fetch('http://localhost:3000/fotos')
      const data = await res.json()
      dispatch({ type: 'SET_TODAS_LAS_FOTOS', payload: data })
      dispatch({ type: 'SET_FOTOS', payload: data })
    }
    getData()
  }, [])

  useEffect(() => {
    const { todaslasFotos, tag, filtro } = state
    const fotosFiltradas = todaslasFotos.filter(foto => {
      const filtroPorTag = !tag || foto.tagId === tag
      const filtroPorTitulo = !filtro || foto.titulo.toLocaleLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '')
        .includes(filtro.toLowerCase())
      return filtroPorTag && filtroPorTitulo
    })
    dispatch({ type: 'SET_FOTOS', payload: fotosFiltradas })
  }, [state.filtro, state.tag, state.todaslasFotos])

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalContextProvider
