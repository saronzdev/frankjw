import type { ProductType, ProductIn } from '../types'
import { AxiosError } from 'axios'
import { api } from './utils'

const UNKNOWN_ERROR = 1
const NETWORK_ERROR = 1000

export const getErrorCode = (error: unknown): number => {
  if (error instanceof AxiosError) {
    if (error.response) return (error.response.data as { code?: number })?.code ?? UNKNOWN_ERROR
    if (error.request) return NETWORK_ERROR
  }
  return UNKNOWN_ERROR
}

export const isUserAdmin = async () => {
  try {
    const { data } = await api.get<{ role?: string }>('auth/me')
    return data.role === 'admin'
  } catch {
    return false
  }
}

export const getProductsSignals = async ({ fresh = false }: { fresh?: boolean } = {}): Promise<ProductType[] | { error: number }> => {
  try {
    const { data } = await api.get<ProductType[]>('products', fresh ? { params: { _: Date.now() } } : undefined)
    return data.map((p) => ({ ...p, isActive: Boolean(p.isActive), hasPreciousStones: Boolean(p.hasPreciousStones) }))
  } catch (error: unknown) {
    return { error: getErrorCode(error) }
  }
}

export const login = async (email: string, password: string) => {
  try {
    await api.post('auth/login', { email, password })
    return { ok: true, error: null }
  } catch (error: unknown) {
    return { ok: false, error: getErrorCode(error) }
  }
}

export const logoutRequest = async () => {
  try {
    await api.post('auth/logout')
    return { ok: true, error: null }
  } catch (error: unknown) {
    return { ok: false, error: getErrorCode(error) }
  }
}

export const createProduct = async (dataProduct: ProductIn) => {
  try {
    await api.post('products', dataProduct)
    return { ok: true, error: null }
  } catch (error: unknown) {
    return { ok: false, error: getErrorCode(error) }
  }
}

export const updateProduct = async (id: number, productData: ProductIn) => {
  try {
    await api.put(`products/${id}`, productData)
    return { ok: true, error: null }
  } catch (error: unknown) {
    return { ok: false, error: getErrorCode(error) }
  }
}

export const deleteProduct = async (id: number) => {
  try {
    await api.delete(`products/${id}`)
    return { ok: true, error: null }
  } catch (error: unknown) {
    return { ok: false, error: getErrorCode(error) }
  }
}
