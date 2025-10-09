import type { IProduct } from './IProduct'

export interface IProductState {
  items: IProduct[]
  status: 'idle' | 'loading' | 'succeded' | 'failed'
  error: string | null
}
