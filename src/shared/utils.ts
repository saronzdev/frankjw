import axios from 'axios'
import type { ProductType } from '../types'

export const handleReservation = async (number: number, product: Omit<ProductType, 'pictures'>) => {
  const message = `Hola! Me interesa reservar: ${product.description} - ID: ${product.productId} - Número: ${number}`
  const whatsappUrl = `https://wa.me/${number.toString()}?text=${encodeURIComponent(message)}`
  window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
}

const url = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'
export const API_URL = url + '/api/v1/'

export const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  },
  withCredentials: true
})

export const normalize = (string: string) => string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()

export const isValidEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

const SUPABASE_CDN = '/storage/v1/object/public/'
const SUPABASE_TRANSFORMS = import.meta.env.VITE_SUPABASE_TRANSFORMS === 'true'

/** Devuelve la URL de Supabase transformada a un ancho/calidad dados, o la original si las transformaciones están desactivadas (requieren Supabase Pro) o no es de Supabase. */
export function optimizeImage(url: string, width: number, quality = 60): string {
  if (!url.includes(SUPABASE_CDN) || !SUPABASE_TRANSFORMS) return url
  return `${url}?width=${width}&quality=${quality}`
}

/** Genera un atributo srcSet responsive para imágenes de Supabase (grid/thumbnails); undefined si las transformaciones están desactivadas. */
export function buildSrcSet(url: string, widths: number[] = [320, 480, 640, 800]): string | undefined {
  if (!url.includes(SUPABASE_CDN) || !SUPABASE_TRANSFORMS) return undefined
  return widths.map((w) => `${optimizeImage(url, w)} ${w}w`).join(', ')
}

export function shouldRetry(errorCode?: number) {
  return errorCode === 1000 || errorCode === 1 || errorCode === 3001 || errorCode === 3002
}

export interface ProductFilterState {
  sortBy?: string
  priceRange?: [number, number]
  selectedKarats?: number[]
  onSale?: boolean
  preciousStones?: boolean
}

/** Filtra y ordena productos aplicando las mismas reglas que la vista de Products. */
export function filterAndSortProducts(list: ProductType[], filters: ProductFilterState): ProductType[] {
  const { sortBy = 'default', priceRange, selectedKarats = [], onSale = false, preciousStones = false } = filters

  let filtered = list

  if (priceRange && (priceRange[0] > 0 || priceRange[1] > 0)) {
    filtered = filtered.filter((p) => {
      const price = p.offerPrice || p.price
      if (priceRange[0] > 0 && price < priceRange[0]) return false
      if (priceRange[1] > 0 && price > priceRange[1]) return false
      return true
    })
  }

  if (selectedKarats.length > 0) {
    filtered = filtered.filter((p) => {
      const productKarats = Array.isArray(p.karats) ? p.karats : []
      return productKarats.some((k: number) => selectedKarats.includes(k))
    })
  }

  if (onSale) {
    filtered = filtered.filter((p) => p.offerPrice && p.offerPrice < p.price)
  }

  if (preciousStones) {
    filtered = filtered.filter((p) => Boolean(p.hasPreciousStones))
  }

  const sorted = [...filtered]

  if (sortBy === 'name') {
    sorted.sort((a, b) => a.description.localeCompare(b.description))
  } else if (sortBy === 'price-asc') {
    sorted.sort((a, b) => a.price - b.price)
  } else if (sortBy === 'price-desc') {
    sorted.sort((a, b) => b.price - a.price)
  } else if (sortBy === 'weight') {
    sorted.sort((a, b) => {
      const weightA = Number(a.weight)
      const weightB = Number(b.weight)

      if (isNaN(weightA) && isNaN(weightB)) return 0
      if (isNaN(weightA)) return 1
      if (isNaN(weightB)) return -1

      return weightB - weightA
    })
  } else {
    sorted.sort((a, b) => b.createdAt - a.createdAt)
  }

  return sorted
}

export {
  socialLinks,
  highlights,
  commonKarats,
  MAX_RETRIES,
  INITIAL_BACKOFF_MS,
  getErrorMessage
} from './constants'

export { CATEGORIES, HIDDEN_CATEGORY, categories, slugify, unslugify, findCategory } from '../data/categories'