import { StarIcon } from '@heroicons/react/24/solid'
import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import {
  fetchProductById,
  selectProductStatus,
  selectSelectedProduct,
} from '../features/products/productsSlice'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { addToCart } from '../features/cart/cartSlice'

const ProductDetail = () => {
  const { productId } = useParams()
  const dispatch = useAppDispatch()
  const product = useAppSelector(selectSelectedProduct)
  const status = useAppSelector(selectProductStatus)

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductById(productId))
    }
  }, [productId, dispatch])

  if (status === 'loading' || !product) {
    return <main className='max-w-7xl mx-auto py-8 px-4'>Cargando información del producto</main>
  }

  const handleAddCart = () => {
    dispatch(addToCart(product))
  }
  return (
    <main className='max-w-7xl mx-auto py-8 px-4'>
      <div className='flex flex-col lg:flex-row gap-8'>
        <div className='md:w-1/2 bg-white p-8 rounded-lg'>
          <div className='aspect-square relative'>
            <img
              src={product.image}
              alt={product.title}
              className='absolute inset-0 w-full h-full object-contain'
            />
          </div>
        </div>
        <div className='md:w-1/2'>
          <div className='bg-white p-6 rounded-lg mb-4'>
            <h1 className='text-2xl font-medium mb-2'>{product.title}</h1>
            <div className='flex items-center mb-4'>
              {[...Array(5)].map((_, index) => (
                <StarIcon
                  key={index}
                  className={`h-4 w-4 ${
                    index < Math.floor(product.rating.rate) ? 'text-yellow-400' : 'text-gray-200'
                  }`}
                />
              ))}
              <span className='text-sm text-blue-500 ml-2'>({product.rating.count})</span>
            </div>
            <div className='border-t border-b py-4 my-4'>
              <div className='text-3xl mb-2'>
                <span className='text-sm align-top'>$</span>
                {product.price}
              </div>
              <div className='text-sm text-gray-500'>Envío gratuito</div>
            </div>
            <p className='text-gray-700 mb-4'>{product.description}</p>
          </div>

          <div className='bg-white p-6 rounded-lg'>
            <div className='space-y-3'>
              <button
                onClick={handleAddCart}
                className='w-full bg-[#FFA41C] hover:bg-[#FA8900] text-black font-medium py-2 px-4 rounded-full border border-[#FF8F00] shadow-sm'
              >
                Agregar al carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default ProductDetail
