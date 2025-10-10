import type { IProduct } from './IProduct'

export interface IProductState {
  items: IProduct[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}
