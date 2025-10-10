import ProductCard from '../components/ProductCard'
import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import { useEffect } from 'react'
import {
  fetchProducts,
  selectAllProducts,
  selectProductError,
  selectProductStatus,
} from '../features/products/productsSlice'
import Filters from '../components/Filters'

const Home = () => {
  // const products = useSelector((state: RootState) => state.products.items)
  const categories: string[] = []
  const dispatch = useAppDispatch()
  const { products, error, status } = useAppSelector((state) => ({
    products: selectAllProducts(state),
    error: selectProductError(state),
    status: selectProductStatus(state),
  }))

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts())
    }
  }, [dispatch, status])

  if (status === 'loading') {
    return (
      <main className='max-w-7xl mx-auto, py-8 px-4'>
        <div className='flex justify-center items-center'>
          <h2>Cargando productos...</h2>
        </div>
      </main>
    )
  }

  if (status === 'failed') {
    return (
      <main className='max-w-7xl mx-auto, py-8 px-4'>
        <div className='flex justify-center items-center'>
          <p className='text-red-500'>Error: {error}</p>
        </div>
      </main>
    )
  }

  return (
    <main className='max-w-7xl mx-auto py-8 px-4'>
      <div className='flex gap-8'>
        <aside className='w-64 flex-shrink-0'>
          <Filters categories={categories} />
        </aside>

        <div className='flex-1'>
          <div className='mb-4' />
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
            {products?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

export default Home
