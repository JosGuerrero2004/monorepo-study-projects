import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit'
import {
  collection,
  doc,
  getCountFromServer,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  QueryConstraint,
  startAfter,
  where,
} from 'firebase/firestore'
import { db } from '../../config/firebase'
import type { IProduct } from '../../interface/IProduct'
import type { IProductState } from '../../interface/IProductsState'
import type { RootState } from '../../store/store'
import type { IFilters } from '../../interface/IFilters'

export const productAdapter = createEntityAdapter<IProduct, string>({
  selectId: (product) => product.id,
})

const initialState = productAdapter.getInitialState<IProductState>({
  ids: [],
  entities: {},
  status: 'idle',
  error: null,
  selectedProduct: '',
  filters: {
    category: '',
    priceRange: [0, Infinity],
    sortBy: '',
  },
  pagination: {
    currentPage: 1,
    itemsPerPage: 3,
    totalItems: 0,
    lastVisibleValue: null,
  },
})

export const fetchProducts = createAsyncThunk('products/fetchProducts', async (_, { getState }) => {
  const state = getState() as RootState
  const { filters, pagination } = state.products
  let { lastVisibleValue } = pagination
  const { itemsPerPage } = pagination

  const queryConstraints: QueryConstraint[] = []
  const productsCollection = collection(db, 'products')

  // 1. Primero los WHERE
  if (filters.category) {
    queryConstraints.push(where('category', '==', filters.category))
  }
  if (filters.priceRange[0] > 0) {
    queryConstraints.push(where('price', '>=', filters.priceRange[0]))
  }
  if (filters.priceRange[1] < Infinity) {
    queryConstraints.push(where('price', '<=', filters.priceRange[1]))
  }

  // 2. Luego UN SOLO orderBy
  let orderField: string
  let orderDirection: 'asc' | 'desc'

  switch (filters.sortBy) {
    case 'price_asc':
      orderField = 'price'
      orderDirection = 'asc'
      break
    case 'price_desc':
      orderField = 'price'
      orderDirection = 'desc'
      break
    case 'rating_desc':
      orderField = 'rating.rate'
      orderDirection = 'desc'
      break
    default:
      orderField = '__name__'
      orderDirection = 'asc'
      break
  }

  queryConstraints.push(orderBy(orderField, orderDirection))

  // 3. Después startAfter (solo UNA VEZ)
  if (lastVisibleValue) {
    queryConstraints.push(startAfter(lastVisibleValue))
  }

  // 4. Finalmente limit
  queryConstraints.push(limit(itemsPerPage))

  const q = query(productsCollection, ...queryConstraints)

  // Contar total sin limit y startAfter
  const totalDocs = await getCountFromServer(
    query(
      productsCollection,
      ...queryConstraints.filter((c) => c.type !== 'limit' && c.type !== 'startAfter')
    )
  )
  const total = totalDocs.data().count

  const queryDocs = await getDocs(q)
  const lastDoc = queryDocs.docs[queryDocs.docs.length - 1]

  // Guardar el valor correcto según el ordenamiento
  switch (filters.sortBy) {
    case 'price_asc':
    case 'price_desc':
      lastVisibleValue = lastDoc?.data()?.price ?? null
      break
    case 'rating_desc':
      lastVisibleValue = lastDoc?.data()?.rating?.rate ?? null
      break
    default:
      lastVisibleValue = lastDoc?.id ?? null
      break
  }

  const products = queryDocs.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as IProduct[]

  return {
    products,
    total,
    lastVisibleValue,
  }
})

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (productId: string) => {
    const productRef = doc(db, 'products', productId)
    const productDoc = await getDoc(productRef)
    if (!productDoc.exists()) {
      throw new Error('Producto no encontrado')
    }
    return { id: productDoc.id, ...productDoc.data() } as IProduct
  }
)

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<IFilters>) => {
      state.filters = action.payload
      state.pagination.currentPage = 1
      state.pagination.lastVisibleValue = null
      state.pagination.totalItems = 0
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.pagination.currentPage = action.payload
    },
    clearProducts: (state) => {
      productAdapter.removeAll(state)
      state.pagination.lastVisibleValue = null
      state.pagination.currentPage = 1
    },
    setSelectedProduct: (state, action: PayloadAction<string>) => {
      state.selectedProduct = action.payload
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
          productAdapter.addMany(state, action.payload.products)
          state.pagination.totalItems = action.payload.total
          state.pagination.lastVisibleValue = action.payload.lastVisibleValue
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
          state.selectedProduct = action.payload.id
        }
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Error consultando el producto'
      })
  },
})

export const { setSelectedProduct, setProducts, setFilters, clearProducts, setCurrentPage } =
  productsSlice.actions

export const { selectAll: selectAllProducts, selectById: selectProductById } =
  productAdapter.getSelectors<RootState>((state) => state.products)

export const selectSelectedProduct = (state: RootState) =>
  state.products.selectedProduct ? selectProductById(state, state.products.selectedProduct) : null

export const selectProductStatus = (state: RootState) => state.products.status
export const selectProductError = (state: RootState) => state.products.error
export const selectFilters = (state: RootState) => state.products.filters
export const selectPaginationInfo = createSelector(
  [(state: RootState) => state.products.pagination],
  (pagination) => ({
    ...pagination,
    totalPages: Math.ceil(pagination.totalItems / pagination.itemsPerPage),
  })
)
export const selectAllCategories = createSelector([selectAllProducts], (products) => [
  ...new Set(products.map((p) => p.category)),
])
export default productsSlice.reducer

export const selectProductBundle = createSelector(
  [selectAllProducts, selectProductError, selectProductStatus],
  (products, error, status) => ({ products, error, status })
)
