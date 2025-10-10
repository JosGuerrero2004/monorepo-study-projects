import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { ICartItem, ICartState } from '../../interface/ICartState'
import type { IProduct } from '../../interface/IProduct'

const initialState: ICartState = {
  items: [],
  isOpen: false,
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IProduct>) => {
      const item = state.items.find((item) => item.id === action.payload.id)
      if (item) {
        item.quantity += 1
      } else {
        state.items.push({ ...action.payload, quantity: 1 })
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const item: ICartItem | undefined = state.items.find((item) => item.id === action.payload.id)
      if (item) {
        item.quantity = action.payload.quantity
      }
    },
    clearCart: (state) => {
      state.items = []
    },
    toggleCart: (state) => {
      state.isOpen = !state.isOpen
    },
  },
})

export const { addToCart, removeFromCart, updateQuantity, clearCart, toggleCart } =
  cartSlice.actions

export const selectCartItems = (state: { cart: ICartState }) => state.cart.items
export const selectCartTotal = (state: { cart: ICartState }) =>
  state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0)
export const selectCartItemsCount = (state: { cart: ICartState }) =>
  state.cart.items.reduce((count, item) => count + item.quantity, 0)
export const selectCartIsOpen = (state: {cart: ICartState}) => state.cart.isOpen

export default cartSlice.reducer
