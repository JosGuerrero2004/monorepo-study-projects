import { useAppSelector } from '../hooks/hooks'

const ProductList = () => {
  const { items: products } = useAppSelector((state) => state.products)

  return (
    <>
      <h2>Productos</h2>
      <div style={{ display: 'grid', gap: '1rem' }}>
        {products.map((p) => {
          return (
            <div>
              <h3>{p.title}</h3>
              <p>{p.description}</p>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default ProductList
