import type { IProduct } from '../interface/IProduct.ts'

export const mockProducts: IProduct[] = [
  {
    id: '2',
    title: 'iPhone 16 Pro Max',
    price: 1999.99,
    description: 'El último iPhone con las características más avanzadas',
    category: 'Electrónicos',
    image: 'https://m.media-amazon.com/images/I/51Ac52-ejcL._AC_SX679_.jpg',
    rating: {
      rate: 4.5,
      count: 120,
    },
  },
  {
    id: '1',
    title: 'iPhone 16 Pro',
    price: 999.99,
    description: 'El último iPhone con las características más avanzadas',
    category: 'Electrónicos',
    image: 'https://m.media-amazon.com/images/I/51Ac52-ejcL._AC_SX679_.jpg',
    rating: {
      rate: 4.5,
      count: 120,
    },
  },
]
