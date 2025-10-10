type Props = { categories: string[] }

const Filters = ({ categories }: Props) => {
  return (
    <div className='w-64 bg-white p-4 rounded shadow'>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='font-bold text-lg'>Filtros</h2>
      </div>
      <div className='mb-6'>
        <label className='block text-sm font-medium text-gray-700 mb-2'>Ordenar por</label>
        <select className='w-full border rounded-md p-2 text-sm'>
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
              <input type='radio' name='category' className='mr-2' />
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
            placeholder='Min'
            className='w-1/2 border rounded-md p-2 text-sm'
            min='0'
          />
          <input type='number' placeholder='Max' className='w-1/2 border rounded-md p-2 text-sm' />
        </div>
      </div>
    </div>
  )
}

export default Filters
