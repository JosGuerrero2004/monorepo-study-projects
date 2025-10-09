import ProductCard from '../components/ProductCard'
import { useAppSelector } from '../hooks/hooks'

const Home = () => {
  // const products = useSelector((state: RootState) => state.products.items)
  const { items: products } = useAppSelector((state) => state.products)
  return (
    <main className='max-w-7xl mx-auto, py-8 px-4'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {products.map((p) => (
          <ProductCard product={p} />
        ))}
      </div>
    </main>
  )
}

export default Home
