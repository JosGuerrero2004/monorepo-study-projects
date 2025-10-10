import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit'
import { collection, doc, getDoc, getDocs } from 'firebase/firestore'
import { db } from '../../config/firebase'
import type { IProduct } from '../../interface/IProduct'
import type { IProductState } from '../../interface/IProductsState'
import type { RootState } from '../../store/store'

export const productAdapter = createEntityAdapter<IProduct>()

const initialState = productAdapter.getInitialState<IProductState>({
  status: 'idle',
  error: null,
  selectedProductId: '',
  ids: [],
  entities: {},
})

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (productId: string) => {
    try {
      const productRef = doc(db, 'products', productId)
      const productDoc = await getDoc(productRef)
      if (!productDoc.exists()) {
        throw new Error('Producto no encontrado')
      }

      return { id: productDoc.id, ...productDoc.data() } as IProduct
    } catch (error) {
      console.log(error)
    }
  }
)

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
    setSelectedProduct: (state, action: PayloadAction<string>) => {
      state.selectedProductId = action.payload
    },
    setProducts: (state, action: PayloadAction<IProduct[]>) => {
      productAdapter.setAll(state, action.payload)
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
        if (action.payload) {
          productAdapter.setAll(state, action.payload)
        }
        state.error = null
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Error cargando los productos'
      })
      .addCase(fetchProductById.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = 'succeeded'
        if (action.payload) {
          productAdapter.upsertOne(state, action.payload)
          state.selectedProductId = action.payload.id
        }
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Error cargando el producto seleccionado'
      })
  },
})

export const { selectAll: selectAllProducts, selectById: selectProductById } =
  productAdapter.getSelectors<RootState>((state) => state.products)

export const selectSelectedProduct = (state: RootState) =>
  state.products.selectedProductId
    ? selectProductById(state, state.products.selectedProductId)
    : null
export const selectProductStatus = (state: RootState) => state.products.status
export const selectProductError = (state: RootState) => state.products.error

export const { setSelectedProduct, setProducts } = productSlice.actions
export default productSlice.reducer
