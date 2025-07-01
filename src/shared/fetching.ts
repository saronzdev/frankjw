import type { ProductType, ProductIn } from './types'
import { capitalize } from './utils'
import axios, { AxiosError } from 'axios'

type CatsResponse = {
  data: string[]
  status: number
}

const URL = (import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000') + '/api/v1/products'
const AUTH_URL = (import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000') + '/api/v1/auth'
const { token } = JSON.parse(localStorage.getItem('auth') || '{}')

export const login = async (email: string, password: string) => {
  try {
    const auth = { email, password }
    const { data } = await axios.post(AUTH_URL + '/login', auth, { headers: { 'Content-Type': 'application/json' } })
    const authData = JSON.stringify({ token: data.token, role: data.role })
    localStorage.setItem('auth', authData)
    return { ok: true, role: data.role }
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      if (error.response) {
        const { data } = error.response
        return { ok: false, error: data.code, role: null }
      } else if (error.request) {
        return { ok: false, error: 1000, role: null }
      }
      return { ok: false, error: 1, role: null }
    }
  }
}

export const getCats = async (
  setData: (value: string[]) => void,
  setError: (code: number) => void,
  setLoading: (satate: boolean) => void
) => {
  try {
    const { data }: CatsResponse = await axios.get(URL + '/cats')
    let cats: string[] = []
    data.forEach((c) => {
      if (!cats.includes(c)) cats.push(c)
    })
    setData(cats.map((c) => capitalize(c)))
    return { ok: true, error: null }
  } catch (error: any) {
    if (error instanceof AxiosError) {
      if (error.response) {
        const { data } = error.response
        console.error('Error fetching categories:', data)
        setError(data.code)
      }
    } else if (error.request) {
      setError(1000)
    }
    setError(1)
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
    const { data }: { data: ProductType[]; status: Number } = await axios.get(url)
    setData(data.map((p) => ({ ...p, category: capitalize(p.category) })))
  } catch (error: any) {
    if (error instanceof AxiosError) {
      if (error.response) {
        const { data } = error.response
        setError(data.code)
      }
    } else if (error.request) {
      setError(1000)
    }
    setError(1)
  } finally {
    setLoading(false)
  }
}

//Admin
export const createProduct = async (dataProduct: ProductIn) => {
  if (!token) return { ok: false, error: 1003 }
  try {
    await axios.post(URL, dataProduct, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    return { ok: true, error: null }
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      if (error.response) {
        const { data } = error.response
        return { ok: false, error: data.code }
      } else if (error.request) {
        return { ok: false, error: 1000 }
      }
      return { ok: false, error: 1 }
    }
  }
}

export const updateProduct = async (id: number, productData: ProductIn) => {
  if (!token) return { ok: false, error: 'No tienes permisos' }
  try {
    await axios.put(URL + '/' + id, productData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    return { ok: true, error: null }
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      if (error.response) {
        const { data } = error.response
        return { ok: false, error: data.code }
      } else if (error.request) {
        return { ok: false, error: 1000 }
      }
      return { ok: false, error: 1 }
    }
  }
}

export const deleteProduct = async (id: number) => {
  if (!token) return { ok: false, error: 'No tienes permisos' }
  try {
    const { status } = await axios.delete(URL + '/' + id, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    if (status !== 200) return
    return { ok: true, error: null }
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      if (error.response) {
        const { data } = error.response
        return { ok: false, error: data.code }
      } else if (error.request) {
        return { ok: false, error: 1000 }
      }
      return { ok: false, error: 1 }
    }
  }
}
