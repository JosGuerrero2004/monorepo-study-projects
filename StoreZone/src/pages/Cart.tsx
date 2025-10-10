import { TrashIcon } from '@heroicons/react/24/solid'
import type { ICartItem } from '../interface/ICartState'
import {
  removeFromCart,
  selectCartItems,
  selectCartItemsCount,
  selectCartTotal,
  updateQuantity,
} from '../features/cart/cartSlice'
import { useAppDispatch, useAppSelector } from '../hooks/hooks'

const Cart = () => {
  const dispatch = useAppDispatch()
  const cartItems = useAppSelector(selectCartItems)
  const totalItems = useAppSelector(selectCartItemsCount)
  const subtotal = useAppSelector(selectCartTotal)
  return (
    <main className='max-w-7xl mx-auto py-8 px-4'>
      <div className='flex flex-col lg:flex-row gap-8'>
        <div className='flex-grow bg-white p-6 rounded-lg shadow'>
          <h1 className='text-3xl font-medium mb-6'>Carrito de compras</h1>
          {cartItems.length === 0 ? (
            <p className='text-gray-500'>Tu carrito está vacio.</p>
          ) : (
            <>
              <div className='border-b pb-4 text-right text-gray-500'>Precio</div>
              {cartItems.map((item: ICartItem) => (
                <div key={item.id} className='py-4 border-b'>
                  <div className='flex gap-4'>
                    <img src={item.image} alt={item.title} className='w-32 h-32 object-contain' />
                    <div className='flex-grow'>
                      <h2 className='font-medium'>{item.title}</h2>
                      <div className='text-sm text-green-600 mt-1'>Disponible</div>
                      <div className='flex items-center gap-2 mt-2'>
                        <select
                          value={item.quantity}
                          onChange={(e) =>
                            dispatch(
                              updateQuantity({
                                id: item.id,
                                quantity: parseInt(e.target.value),
                              })
                            )
                          }
                          className='border rounded p-1'
                        >
                          {[...Array(10)].map((_, i) => (
                            <option key={i + 1} value={i + 1}>
                              {i + 1}
                            </option>
                          ))}
                        </select>
                        <button
                          onClick={() => dispatch(removeFromCart(item.id))}
                          className='text-blue-500 hover:text-blue-600 flex items-center'
                        >
                          <TrashIcon className='h-4 w-4 mr-1' />
                        </button>
                      </div>
                    </div>
                    <div className='text-lg font-medium'>
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
              <div className='text-right text-lg mt-4'>
                Subtotal ({totalItems} items):
                <span className='font-bold'>${subtotal.toFixed(2)}</span>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  )
}

export default Cart
