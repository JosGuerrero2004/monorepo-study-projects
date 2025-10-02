import { createContext } from 'react'
import { ITareaContext } from '../interfaces/ITareaContext'

const TareaContext = createContext<ITareaContext | undefined>(undefined)

export default TareaContext
