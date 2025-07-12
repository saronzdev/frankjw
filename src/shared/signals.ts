import { signal, computed } from '@preact/signals'
import type { ProductType, Result } from './types'
import { getProductsSignals, isUserAdmin } from './fetching'

export const products = signal<ProductType[]>([])
export const loading = signal(true)
export const error = signal(0)
export const isAdmin = signal<boolean | null>(null)

async function getProducts() {
  loading.value = true
  const result = (await getProductsSignals()) as Result
  if (result.error) error.value = result.error
  else products.value = result
  loading.value = false
}

async function checkAdmin() {
  isAdmin.value = await isUserAdmin()
}

await getProducts()
await checkAdmin()

export const cats = computed(() => [...new Set(products.value.map((p) => p.category))])
export const mostRecents = computed(() =>
  [...products.value].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 4)
)
export const bestSellers = computed(() => [...products.value].sort((a, b) => b.sales - a.sales).slice(0, 4))

export const refreshProducts = async () => await getProducts()
export const refreshRole = async () => await checkAdmin()
