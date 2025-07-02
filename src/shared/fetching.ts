import type { ProductType, ProductIn } from './types'
import { capitalize } from './utils'
import { AxiosError } from 'axios'
import { api } from './utils'

type CatsResponse = {
  data: string[]
  status: number
}

export const isAdmin = async () => {
  try {
    const { data } = await api.get('me')
    return data.role === 'admin'
  } catch {
    return false
  }
}

export const login = async (email: string, password: string) => {
  try {
    const auth = { email, password }
    await api.post('auth/login', auth)
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      if (error.response) {
        const { data } = error.response
        return { ok: false, error: data.code }
      } else if (error.request) return { ok: false, error: 1000 }
      return { ok: false, error: 1 }
    }
  }
}

export const getCats = async (
  setData: (value: string[]) => void,
  setError: (code: number) => void,
  setLoading: (satate: boolean) => void
) => {
  try {
    const { data }: CatsResponse = await api.get('products/cats')
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
        setError(data.code)
      } else if (error.request) setError(1000)
      else setError(1)
    }
  } finally {
    setLoading(false)
  }
}
export const getProducts = async (
  setData: (value: ProductType[]) => void,
  setError: (code: number) => void,
  setLoading: (satate: boolean) => void
) => {
  try {
    const { data }: { data: ProductType[] } = await api.get('products')
    setData(data.map((p) => ({ ...p, category: capitalize(p.category) })))
  } catch (error: any) {
    if (error instanceof AxiosError) {
      if (error.response) {
        const { data } = error.response
        setError(data.code)
      } else if (error.request) setError(1000)
      else setError(1)
    }
  } finally {
    setLoading(false)
  }
}

export const getProductsByCategory = async (
  setData: (value: ProductType[]) => void,
  setError: (code: number) => void,
  setLoading: (satate: boolean) => void,
  category: string
) => {
  try {
    const { data }: { data: ProductType[] } = await api.get('products/category/' + category.toLowerCase())
    setData(data.map((p) => ({ ...p, category: capitalize(p.category) })))
  } catch (error: any) {
    if (error instanceof AxiosError) {
      if (error.response) {
        const { data } = error.response
        setError(data.code)
      } else if (error.request) setError(1000)
      else setError(1)
    }
  } finally {
    setLoading(false)
  }
}

//Admin
export const createProduct = async (dataProduct: ProductIn) => {
  try {
    await api.post('products', dataProduct)
    return { ok: true, error: null }
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      if (error.response) {
        const { data } = error.response
        return { ok: false, error: data.code }
      } else if (error.request) return { ok: false, error: 1000 }
      return { ok: false, error: 1 }
    }
  }
}

export const updateProduct = async (id: number, productData: ProductIn) => {
  try {
    await api.put(`products/${id}`, productData)
    return { ok: true, error: null }
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      if (error.response) {
        const { data } = error.response
        return { ok: false, error: data.code }
      } else if (error.request) return { ok: false, error: 1000 }
      return { ok: false, error: 1 }
    }
  }
}

export const deleteProduct = async (id: number) => {
  try {
    await api.delete(`products/${id}`)
    return { ok: true, error: null }
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      if (error.response) {
        const { data } = error.response
        return { ok: false, error: data.code }
      } else if (error.request) return { ok: false, error: 1000 }
      return { ok: false, error: 1 }
    }
  }
}
