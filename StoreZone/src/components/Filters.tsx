import { useEffect, useState, useRef } from 'react'
import type { IFilters } from '../interface/IFilters'
import { XMarkIcon } from '@heroicons/react/24/solid'

type Props = {
  categories: string[]
  onFilterChange: (filters: IFilters) => void
  currentFilters: IFilters
}

const Filters = ({ categories, currentFilters, onFilterChange }: Props) => {
  const [selectedCategory, setSelectedCategory] = useState(currentFilters.category)
  const [minPrice, setMinPrice] = useState(
    currentFilters.priceRange[0] === 0 ? '' : currentFilters.priceRange[0].toString()
  )
  const [maxPrice, setMaxPrice] = useState(
    currentFilters.priceRange[1] === Infinity ? '' : currentFilters.priceRange[1].toString()
  )
  const [sortBy, setSortBy] = useState(currentFilters.sortBy)

  // Ref para evitar el loop al sincronizar desde Redux
  const isExternalUpdate = useRef(false)

  // Solo actualizar el estado local cuando currentFilters cambia externamente
  useEffect(() => {
    isExternalUpdate.current = true
    setSelectedCategory(currentFilters.category)
    setMinPrice(currentFilters.priceRange[0] === 0 ? '' : currentFilters.priceRange[0].toString())
    setMaxPrice(
      currentFilters.priceRange[1] === Infinity ? '' : currentFilters.priceRange[1].toString()
    )
    setSortBy(currentFilters.sortBy)
  }, [currentFilters.category, currentFilters.priceRange, currentFilters.sortBy])

  // Aplicar filtros con debounce
  useEffect(() => {
    // Si es una actualización externa, no disparar onChange
    if (isExternalUpdate.current) {
      isExternalUpdate.current = false
      return
    }

    const timeoutId = setTimeout(() => {
      const newFilters: IFilters = {
        category: selectedCategory,
        priceRange: [Number(minPrice) || 0, Number(maxPrice) || Infinity],
        sortBy,
      }

      // Solo actualizar si realmente cambió
      const hasChanged =
        newFilters.category !== currentFilters.category ||
        newFilters.priceRange[0] !== currentFilters.priceRange[0] ||
        newFilters.priceRange[1] !== currentFilters.priceRange[1] ||
        newFilters.sortBy !== currentFilters.sortBy

      if (hasChanged) {
        onFilterChange(newFilters)
      }
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [
    selectedCategory,
    minPrice,
    maxPrice,
    sortBy,
    currentFilters.category,
    currentFilters.priceRange,
    currentFilters.sortBy,
    onFilterChange,
  ])

  const clearFilters = () => {
    setSelectedCategory('')
    setMinPrice('')
    setMaxPrice('')
    setSortBy('')
  }

  const hasActiveFilters = selectedCategory || minPrice || maxPrice || sortBy

  return (
    <div className='w-64 bg-white p-4 rounded shadow'>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='font-bold text-lg'>Filtros</h2>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className='text-sm text-blue-500 hover:text-blue-600 flex items-center'
          >
            <XMarkIcon className='h-4 w-4 mr-1' />
            Limpiar filtros
          </button>
        )}
      </div>

      <div className='mb-6'>
        <label className='block text-sm font-medium text-gray-700 mb-2'>Ordenar por</label>
        <select
          className='w-full border rounded-md p-2 text-sm'
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value=''>Seleccionar</option>
          <option value='price_asc'>Menor precio</option>
          <option value='price_desc'>Mayor precio</option>
          <option value='rating_desc'>Mejor valorados</option>
        </select>
      </div>

      <div className='mb-6'>
        <h3 className='font-medium text-sm mb-2'>Categorías</h3>
        <div className='space-y-2'>
          {categories.map((category) => (
            <label key={category} className='flex items-center'>
              <input
                type='radio'
                name='category'
                checked={selectedCategory === category}
                onChange={() => setSelectedCategory(category)}
                className='mr-2'
              />
              <span className='text-sm'>{category}</span>
            </label>
          ))}
        </div>
      </div>

      <div className='mb-6'>
        <h3 className='font-medium text-sm mb-2'>Rango de precio</h3>
        <div className='flex gap-2'>
          <input
            type='number'
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder='Min'
            className='w-1/2 border rounded-md p-2 text-sm'
            min='0'
          />
          <input
            type='number'
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder='Max'
            className='w-1/2 border rounded-md p-2 text-sm'
            min={minPrice || '0'}
          />
        </div>
      </div>
    </div>
  )
}

export default Filters
