import { createSlice } from '@reduxjs/toolkit'
import type { IProductState } from '../../interface/IProductsState'
import { mockProducts } from '../../utils/mockData'

const initialState: IProductState = {
  items: mockProducts,
  status: 'succeded',
  error: null,
}

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.items = action.payload
    },
  },
})

export const { setProducts } = productSlice.actions
export default productSlice.reducer
