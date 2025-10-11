import ProductCard from '../components/ProductCard'
import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import { useCallback, useEffect, useRef } from 'react'
import {
  clearProducts,
  fetchProducts,
  selectAllCategories,
  selectFilters,
  selectPaginationInfo,
  selectProductBundle,
  setCurrentPage,
  setFilters,
} from '../features/products/productsSlice'
import Filters from '../components/Filters'
import type { IFilters } from '../interface/IFilters'
import { useInView } from 'react-intersection-observer'

const Home = () => {
  const categories: string[] = useAppSelector(selectAllCategories)
  const dispatch = useAppDispatch()
  const currentFilters = useAppSelector(selectFilters)
  const { totalPages, currentPage } = useAppSelector(selectPaginationInfo)
  const { products, error, status } = useAppSelector(selectProductBundle)

  const isInitialLoad = useRef(true)

  const { ref, inView } = useInView({
    threshold: 0,
  })

  // Memoizar el handler para evitar recrearlo
  const handleFilterChange = useCallback(
    (filters: IFilters) => {
      dispatch(setFilters(filters))
    },
    [dispatch]
  )

  // Cargar productos cuando cambian los filtros
  useEffect(() => {
    dispatch(clearProducts())
    dispatch(fetchProducts())
    isInitialLoad.current = false
  }, [dispatch, currentFilters])

  // Infinite scroll - solo cuando ya pasó la carga inicial
  useEffect(() => {
    if (!isInitialLoad.current && inView && status !== 'loading' && currentPage < totalPages) {
      dispatch(setCurrentPage(currentPage + 1))
      dispatch(fetchProducts())
    }
  }, [inView, status, currentPage, totalPages, dispatch])

  if (status === 'loading' && products.length === 0) {
    return (
      <main className='max-w-7xl mx-auto py-8 px-4'>
        <div className='flex justify-center items-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900' />
        </div>
      </main>
    )
  }

  if (status === 'failed') {
    return (
      <main className='max-w-7xl mx-auto py-8 px-4'>
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
          <Filters
            onFilterChange={handleFilterChange}
            currentFilters={currentFilters}
            categories={categories}
          />
        </aside>
        <div className='flex-1'>
          <div className='mb-4'>
            <p className='text-sm text-gray-600'>
              Mostrando {products.length} de {totalPages * 3} productos
            </p>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
            {products?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
      {currentPage < totalPages && (
        <div ref={ref} className='mt-8 flex justify-center py-4'>
          {status === 'loading' && (
            <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900' />
          )}
        </div>
      )}
    </main>
  )
}

export default Home
