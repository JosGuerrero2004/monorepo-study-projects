interface LocalStorageProps<T> {
  key: string
  value: T
}

export function saveToLocalStorage<T>({ key, value }: LocalStorageProps<T>) {
  localStorage.setItem(key, JSON.stringify(value))
}

export function loadFromLocalStorage<T>(key: string): T[] {
  const data: string | null = localStorage.getItem(key)
  return data && data !== 'undefined' ? (JSON.parse(data) as T[]) : []
}
