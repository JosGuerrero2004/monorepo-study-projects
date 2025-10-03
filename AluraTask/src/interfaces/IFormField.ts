type FieldType = 'text' | 'textarea' | 'select' | 'date' | 'number'

interface IFormField<T> {
  name: keyof T
  label: string
  type: FieldType
  options?: string[]
  validation?: (value: T[keyof T]) => string | undefined
}

export default IFormField
