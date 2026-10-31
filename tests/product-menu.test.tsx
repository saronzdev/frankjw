// @vitest-environment happy-dom
import { describe, expect, it, beforeEach } from 'vitest'
import { render } from '@testing-library/preact'
import { products } from '@/shared/signals'
import { ProductMenu } from '@/layout/ProductMenu'
import type { ProductType } from '@/types'

const sample: ProductType = {
  id: 1,
  productId: 'AB-001',
  description: 'anillo de oro 14k',
  category: 'Anillos para mujer',
  price: 100,
  weight: 1,
  karats: [14],
  isActive: true,
  sales: 0,
  hasDiscount: false,
  hasPreciousStones: false,
  createdAt: 1,
  pictures: []
}

describe('ProductMenu', () => {
  beforeEach(() => {
    products.value = []
  })

  it('no muestra el panel ni aria-haspopup cuando no hay categorías', () => {
    const { baseElement } = render(<ProductMenu />)
    expect(baseElement.querySelector('ul')).toBeNull()
    expect(baseElement.querySelector('[aria-haspopup="true"]')).toBeNull()
    expect(baseElement.querySelector('svg.lucide-chevron-down')).toBeNull()
  })

  it('lista las categorías cuando hay productos', () => {
    products.value = [sample]
    const { baseElement } = render(<ProductMenu />)
    expect(baseElement.querySelector('[aria-haspopup="true"]')).toBeTruthy()
    expect(baseElement.textContent).toContain('Anillos para mujer')
  })
})
