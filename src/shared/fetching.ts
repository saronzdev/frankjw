import type { ProductType, ErrorResponse, ProductIn, LoginResponse } from './types'
import { capitalize } from './utils'
import axios, { AxiosError } from 'axios'

type CatsResponse = {
  data: string[]
  status: number
}

const Errors = (error: AxiosError) => {
  let response: string
  switch (error.status) {
    case 404:
      response = 'No hay productos aún...'
      break
    default:
      response = error.toString()
  }
  return response
}

const URL = (import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000') + '/api/v1/products'
const AUTH_URL = (import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000') + '/api/v1/auth'
const auth = localStorage.getItem('auth')?.split('"')[1]

export const login = async (email: string, password: string) => {
  try {
    const { data, status }: LoginResponse = await axios.post(
      AUTH_URL + '/login',
      { email, password },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    if (status !== 200) return
    const authData = JSON.stringify({ token: data.token, role: data.role })
    localStorage.setItem('auth', authData)
    return { ok: true, error: null, role: data.role }
  } catch (error) {
    if (error instanceof AxiosError) return { ok: false, error: Errors(error), role: null }
  }
}

export const getCats = async (
  setData: (value: string[]) => void,
  setError: (message: string) => void,
  setLoading: (satate: boolean) => void
) => {
  try {
    const { data, status }: CatsResponse = await axios.get(URL + '/cats')
    if (status !== 200) return
    let cats: string[] = []
    data.forEach((c) => {
      if (!cats.includes(c)) cats.push(c)
    })
    setData(cats.map((c) => capitalize(c)))
  } catch (error) {
    if (error instanceof AxiosError) setError(Errors(error))
  } finally {
    setLoading(false)
  }
}

export const getProducts = async (
  setData: (value: ProductType[]) => void,
  setError: (message: string) => void,
  setLoading: (satate: boolean) => void,
  category?: string
) => {
  try {
    const url = category ? URL + '/' + category.toLowerCase() : URL
    const { data, status }: { data: ProductType[]; status: Number } = await axios.get(url)
    if (status !== 200) return
    setData(data.map((p) => ({ ...p, category: capitalize(p.category) })))
  } catch (error) {
    if (error instanceof AxiosError) setError(Errors(error))
  } finally {
    setLoading(false)
  }
}

//Admin
export const createProduct = async (dataProduct: ProductIn) => {
  try {
    const { status } = await axios.post(URL, dataProduct, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth}`
      }
    })
    if (status !== 200) return
    return { ok: true, error: null }
  } catch (error) {
    if (error instanceof AxiosError) return { ok: false, error: Errors(error) }
  }
}

export const updateProduct = async (id: number, productData: ProductIn) => {
  try {
    const { status } = await axios.put(URL + '/' + id, productData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth}`
      }
    })
    if (status !== 200) return
    return { ok: false, error: null }
  } catch (error) {
    if (error instanceof AxiosError) return { ok: false, error: Errors(error) }
  }
}

export const deleteProduct = async (id: number) => {
  try {
    const { status } = await axios.delete(URL + '/' + id, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth}`
      }
    })
    if (status !== 200) return
    return { ok: true, error: null }
  } catch (error) {
    if (error instanceof AxiosError) return { ok: false, error: Errors(error) }
  }
}
