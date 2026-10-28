import { signal, computed } from '@preact/signals'
import type { ProductType } from '../types'
import { getProductsSignals, isUserAdmin, logoutRequest } from './fetching'
import { MAX_RETRIES, INITIAL_BACKOFF_MS, delay, shouldRetry } from './utils'
import { HIDDEN_CATEGORY, findCategory } from '../data/categories'

export const products = signal<ProductType[]>([])
export const loading = signal(true)
export const error = signal(0)
export const isAdmin = signal<boolean | null>(null)

async function getProducts(options?: { fresh?: boolean }) {
  loading.value = true
  error.value = 0

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    const result = await getProductsSignals(options)

    if (Array.isArray(result)) {
      products.value = result
      loading.value = false
      return
    }

    const errorCode = result.error

    const isLastAttempt = attempt === MAX_RETRIES
    if (!shouldRetry(errorCode) || isLastAttempt) {
      error.value = errorCode
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
    .filter((cat) => cat !== HIDDEN_CATEGORY && findCategory(cat))

  return uniqueCategories
    .map((cat) => ({
      name: cat,
      order: findCategory(cat)?.order ?? 999
    }))
    .sort((a, b) => a.order - b.order)
    .map((c) => c.name)
})

export const mostRecents = computed(() =>
  [...products.value]
    .filter((p) => p.category !== HIDDEN_CATEGORY)
    .sort((a, b) => {
      const dateComparison = b.createdAt - a.createdAt
      if (dateComparison !== 0) return dateComparison
      return b.id - a.id
    })
    .slice(0, 4)
)

export const refreshProducts = async (options?: { fresh?: boolean }) => await getProducts(options)
export const refreshRole = async () => await checkAdmin()

export const logout = async () => {
  await logoutRequest()
  localStorage.removeItem('logged')
  isAdmin.value = false
}
