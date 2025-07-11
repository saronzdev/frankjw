import type { ProductType, ProductIn } from './types'
import { AxiosError } from 'axios'
import { api } from './utils'
import { products, error as pError, loading, isAdmin } from './signals'

export const isUserAdmin = async () => {
  try {
    const { data } = await api.get('auth/me')
    return (isAdmin.value = data.role === 'admin')
  } catch {
    return (isAdmin.value = false)
  }
}

export const getProductsSignals = async () => {
  try {
    const { data }: { data: ProductType[] } = await api.get('products')
    products.value = data.map((p) => ({ ...p, isActive: Boolean(p.isActive) }))
  } catch (error: any) {
    if (error instanceof AxiosError) {
      if (error.response) {
        const { data } = error.response
        pError.value = data.code
      } else if (error.request) pError.value = 1000
      else pError.value = 1
    }
  } finally {
    loading.value = false
  }
}

export const login = async (email: string, password: string) => {
  try {
    const auth = { email, password }
    await api.post('auth/login', auth)
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

export const increaseSales = async (id: number) => {
  try {
    await api.patch('products/sales/' + id)
  } catch (error: any) {
    if (error instanceof AxiosError) {
      if (error.response) {
        const { data } = error.response
        console.log(data.code)
      } else if (error.request) console.log(1000)
      else console.log('Error')
    }
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
