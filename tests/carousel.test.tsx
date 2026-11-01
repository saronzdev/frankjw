// @vitest-environment happy-dom
import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/preact'
import { Carousel } from '@/components/landing/Carousel'
import type { ProductType } from '@/types'

const product: ProductType = {
  id: 1,
  productId: 'AB-001',
  description: 'anillo de oro 14k, talla 7',
  category: 'Anillos para mujer',
  price: 100,
  weight: 1,
  karats: [14],
  isActive: true,
  sales: 0,
  hasDiscount: false,
  hasPreciousStones: false,
  createdAt: 1,
  pictures: ['https://cdn.example.com/anillo.jpg']
}

describe('Carousel', () => {
  it('enlaza Ver con la URL canónica del producto', () => {
    const { getByText } = render(<Carousel title="Últimos Productos" items={[product]} />)
    const link = getByText('Ver').closest('a')

    expect(link?.getAttribute('href')).toBe(
      '/products/anillos-para-mujer/anillo-de-oro-14k--ab-001'
    )
  })

  it('cae al catálogo cuando el producto no tiene categoría conocida', () => {
    const { getByText } = render(
      <Carousel title="Últimos Productos" items={[{ ...product, category: 'Inexistente' }]} />
    )
    const link = getByText('Ver').closest('a')

    expect(link?.getAttribute('href')).toBe('/products')
  })
})
