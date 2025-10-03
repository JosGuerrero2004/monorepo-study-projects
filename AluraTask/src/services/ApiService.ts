import { IApiResponse } from '../interfaces/IApiResponse'

export const fetchDataAPI = async <T>(
  url: string,
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT' = 'GET',
  body?: Partial<T>
): Promise<IApiResponse<T>> => {
  try {
    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
    }
    const res = await fetch(url, options)
    if (!res.ok) {
      return {
        data: null,
        error: `Error ${res.status}: ${res.statusText}`,
        status: res.status,
      }
    }
    const data = await res.json()
    return {
      data,
      error: null,
      status: res.status,
    }
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : 'Error desconocido',
      status: 500,
    }
  }
}
