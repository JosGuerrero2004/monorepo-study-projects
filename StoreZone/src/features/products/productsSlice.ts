import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { IProductState } from '../../interface/IProductsState'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../config/firebase'
import type { IProduct } from '../../interface/IProduct'

const initialState: IProductState = {
  items: [],
  status: 'idle',
  error: null,
}

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  try {
    const productsCollection = collection(db, 'products')
    const productsDoc = await getDocs(productsCollection)
    const productList = productsDoc.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as IProduct[]

    return productList
  } catch (error) {
    console.log(error)
  }
})

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.items = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload || []
        state.error = null
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Error cargando los productos'
      })
  },
})

export const { setProducts } = productSlice.actions
export default productSlice.reducer
