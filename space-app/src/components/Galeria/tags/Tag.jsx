import styled from 'styled-components'
import tags from './tags.json'
import { useContext } from 'react'
import { GlobalContext } from '../../context/GlobalContext'

const TagButton = styled.button`
  font-size: 24px;
  color: #ffffff;
  background: rgba(217, 217, 217, 0.3);
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  padding: 12px;
  box-sizing: border-box;
  border: 2px solid transparent;
  &:hover {
    border-color: #c98cf1;
  }
`

const TagsContainer = styled.article`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 26px 0;
  max-height: 52px;
`

const TagTitulo = styled.h3`
  color: #d9d9d9;
  font-size: 24px;
  margin: 0;
`

const Tag = () => {
  const { dispatch } = useContext(GlobalContext)
  return (
    <>
      <TagsContainer>
        <TagTitulo>Buscar por tags:</TagTitulo>
        {tags.map((tag) => {
          return (
            <TagButton
              key={tag.id}
              onClick={() => dispatch({ type: 'SET_TAG', payload: tag.tag })}
            >
              {tag.titulo}
            </TagButton>
          )
        })}
      </TagsContainer>
    </>
  )
}

export default Tag
