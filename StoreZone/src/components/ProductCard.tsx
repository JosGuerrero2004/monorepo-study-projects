import { StarIcon } from '@heroicons/react/20/solid'
import type { IProduct } from '../interface/IProduct'

type Props = {
  product: IProduct
}

const ProductCard = ({ product }: Props) => {
  return (
    <div className='bg-white p-4 rounded shadow-md hover:shadow-lg transition-shadow'>
      <div className='relative aspect-square mb-4'>
        <img
          src={product.image}
          alt={product.title}
          className='absolute inset-0 w-full h-full object-contain'
        />
      </div>
      <h2 className='text-sm line-clamp-2 mb-2'>{product.title}</h2>
      <div className='flex items-center mb-1'>
        {[...Array(5)].map((_, index) => (
          <StarIcon
            key={index}
            className={`h-4 w-4 ${index < Math.floor(product.rating.rate) ? 'text-yellow-400' : 'text-gray-200'}`}
          />
        ))}
        <span className='text-sm text-blue-500 ml-1'>({product.rating.count})</span>
      </div>
      <div className='flex items-baseline'>
        <span className='text-xs'>$</span>
        <span className='text-lg font-bold'>{product.price}</span>
      </div>
    </div>
  )
}

export default ProductCard
