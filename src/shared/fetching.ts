import type { ProductType, ErrorResponse, ProductIn, LoginResponse } from './types'
import { capitalize } from './utils'

const URL = import.meta.env.VITE_BACKEND_URL ?? 'http://localhost:3000' + '/api/v1/products'
const AUTH_URL = import.meta.env.VITE_BACKEND_URL ?? 'http://localhost:3000' + '/api/v1/auth'
const auth = localStorage.getItem('auth')?.split('"')[1]

export const login = async (email: string, password: string) => {
  try {
    const response = await fetch(AUTH_URL + '/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
    const { token, role, code } = (await response.json()) as LoginResponse
    if (response.ok) {
      const data = JSON.stringify({ token, role })
      localStorage.setItem('auth', data)
      return { ok: true, error: null }
    } else return { ok: false, error: code }
  } catch {
    return { ok: false, error: 1000 }
  }
}

export const getCats = async (
  setData: (value: string[]) => void,
  setError: (code: number) => void,
  setLoading: (satate: boolean) => void
) => {
  try {
    const response = await fetch(URL + '?cats=true')
    if (response.ok) {
      const result = (await response.json()) as string[]
      let data: string[] = []
      result.forEach((c) => {
        if (!data.includes(c)) data.push(c)
      })
      setData(data.map((c) => capitalize(c)))
    } else {
      const error = (await response.json()) as ErrorResponse
      setError(error.code)
    }
  } catch {
    setError(1000)
  } finally {
    setLoading(false)
  }
}

export const getProducts = async (
  setData: (value: ProductType[]) => void,
  setError: (code: number) => void,
  setLoading: (satate: boolean) => void,
  category?: string
) => {
  try {
    const url = category ? URL + '/' + category.toLowerCase() : URL
    const response = await fetch(url)
    if (response.ok) {
      const result = (await response.json()) as ProductType[]
      setData(result.map((p) => ({ ...p, category: capitalize(p.category) })))
    } else {
      const error = (await response.json()) as ErrorResponse
      setError(error.code)
    }
  } catch {
    setError(1000)
  } finally {
    setLoading(false)
  }
}

//Admin
export const createProduct = async (data: ProductIn) => {
  try {
    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth}`
      },
      body: JSON.stringify(data)
    })
    if (response.ok) return { ok: true, error: null }
    else {
      const { code } = (await response.json()) as ErrorResponse
      return { ok: false, error: code }
    }
  } catch {
    return { ok: false, error: 1000 }
  }
}

export const updateProduct = async (id: number, data: ProductIn) => {
  try {
    const response = await fetch(URL + '/' + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth}`
      },
      body: JSON.stringify(data)
    })
    if (response.ok) return { ok: true, error: null }
    else {
      const { code } = (await response.json()) as ErrorResponse
      return { ok: false, error: code }
    }
  } catch {
    return { ok: false, error: 1000 }
  }
}

export const deleteProduct = async (id: number) => {
  try {
    const response = await fetch(URL + '/' + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth}`
      }
    })
    if (response.ok) return { ok: true, error: null }
    else {
      const { code } = (await response.json()) as ErrorResponse
      return { ok: false, error: code }
    }
  } catch {
    return { ok: false, error: 1000 }
  }
}
