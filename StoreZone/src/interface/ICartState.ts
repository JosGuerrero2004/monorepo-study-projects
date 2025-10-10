import type { IProduct } from "./IProduct";

export interface ICartItem extends IProduct {
  quantity: number
}

export interface ICartState {
  items: ICartItem[]
  isOpen: boolean
}
