import ProductCard from '../components/ProductCard'
import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import { useEffect } from 'react'
import { fetchProducts } from '../features/products/productsSlice'

const Home = () => {
  // const products = useSelector((state: RootState) => state.products.items)
  const dispatch = useAppDispatch()
  const { items: products, status, error } = useAppSelector((state) => state.products)

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
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  )
}

export default Home
