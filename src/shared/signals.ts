import { signal, computed } from '@preact/signals'
import type { ProductType, Result } from '../types'
import { getProductsSignals, isUserAdmin } from './fetching'
import { MAX_RETRIES, INITIAL_BACKOFF_MS, delay, shouldRetry } from './utils'
import { CATEGORIES } from './constants'

export const products = signal<ProductType[]>([])
export const loading = signal(true)
export const error = signal(0)
export const isAdmin = signal<boolean | null>(null)

async function getProducts() {
  loading.value = true
  error.value = 0

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    const result = (await getProductsSignals()) as Result

    if (!(result as any).error) {
      products.value = result
      loading.value = false
      return
    }

    const errorCode = (result as any).error as number | undefined

    const isLastAttempt = attempt === MAX_RETRIES
    if (!shouldRetry(errorCode) || isLastAttempt) {
      error.value = errorCode ?? 1
      loading.value = false
      return
    }

    const backoff = INITIAL_BACKOFF_MS * Math.pow(2, attempt - 1)
    const jitter = Math.floor(Math.random() * 250)
    await delay(backoff + jitter)
  }
}

async function checkAdmin() {
  const isLogged = Boolean(localStorage.getItem('logged'))
  if (!isLogged) {
    isAdmin.value = false
    return
  }
  isAdmin.value = await isUserAdmin()
}

getProducts()
checkAdmin()

export const cats = computed(() => {
  const uniqueCategories = [...new Set(products.value.map((p) => p.category))]

  return uniqueCategories
    .map((cat) => {
      const categoryMeta = CATEGORIES.find((c) => c.title.toLowerCase().trim() === cat.toLowerCase().trim())
      return {
        name: cat,
        order: categoryMeta?.order ?? 999
      }
    })
    .sort((a, b) => a.order - b.order)
    .map((c) => c.name)
})

export const mostRecents = computed(() =>
  [...products.value]
    .sort((a, b) => {
      const dateComparison = b.createdAt - a.createdAt
      if (dateComparison !== 0) return dateComparison
      return b.id - a.id
    })
    .slice(0, 4)
)

export const refreshProducts = async () => await getProducts()
export const refreshRole = async () => await checkAdmin()
