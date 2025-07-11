import { signal, computed, effect } from '@preact/signals'
import type { ProductType } from './types'
import { getProductsSignals, isUserAdmin } from './fetching'

export const products = signal<ProductType[]>([])
export const loading = signal(true)
export const error = signal(0)
export const refresh = signal(false)
export const refreshAdmin = signal(false)
export const isAdmin = signal(false)

effect(() => {
  loading.value = true
  getProductsSignals()
  refresh.value
})

effect(() => {
  isUserAdmin()
  refreshAdmin.value
})

export const cats = computed(() => [...new Set(products.value.map((p) => p.category))])
export const mostRecents = computed(() =>
  [...products.value].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 4)
)
export const bestSellers = computed(() => [...products.value].sort((a, b) => b.sales - a.sales).slice(0, 4))
