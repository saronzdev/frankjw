import axios from 'axios'
import type { ProductType } from '../types'
import { CATEGORIES } from './constants'

export const handleReservation = async (number: number, product: Omit<ProductType, 'pictures'>) => {
  const message = `Hola! Me interesa reservar: ${product.description} - ID: ${product.productId} - Número: ${number}`
  const whatsappUrl = `https://wa.me/${number.toString()}?text=${encodeURIComponent(message)}`
  window.open(whatsappUrl, '_blank')
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

export const slugify = (string: string): string => {
  return string
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '')
}

export const unslugify = (slug: string): string => {
  const normalizedSlug = slug.toLowerCase().trim()

  const category = CATEGORIES.find((cat) => {
    const catSlug = slugify(cat.title)
    return catSlug === normalizedSlug
  })

  return category?.title || ''
}

export const isValidEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function shouldRetry(errorCode?: number) {
  return errorCode === 1000 || errorCode === 1 || errorCode === 3001 || errorCode === 3002
}

export {
  socialLinks,
  highlights,
  CATEGORIES,
  categories,
  menuItems,
  menuItemsMobile,
  titles,
  MAX_RETRIES,
  INITIAL_BACKOFF_MS,
  getErrorMessage
} from './constants'
