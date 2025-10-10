import type { EntityState } from '@reduxjs/toolkit'
import type { IProduct } from './IProduct'

export interface IProductState extends EntityState<IProduct, string> {
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
  selectedProductId: string
}
