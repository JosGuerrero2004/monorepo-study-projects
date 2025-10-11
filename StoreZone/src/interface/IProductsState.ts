import type { EntityState } from '@reduxjs/toolkit'
import type { IProduct } from './IProduct'
import type { IFilters } from './IFilters'

export interface IProductState extends EntityState<IProduct, string> {
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
  selectedProduct: string
  filters: IFilters
  pagination: {
    currentPage: number
    itemsPerPage: number
    totalItems: number
    lastVisibleValue: string | number | null
  }
}
