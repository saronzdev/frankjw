// @vitest-environment happy-dom
import { beforeEach, describe, expect, it } from 'vitest'
import { fireEvent, render, waitFor } from '@testing-library/preact'
import { Router, useLocation } from 'wouter'
import { memoryLocation } from 'wouter/memory-location'
import { Products } from '@/pages/Products'
import { products, loading, error } from '@/shared/signals'
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

function LocationProbe() {
  const [location] = useLocation()
  return <span data-testid="location">{location}</span>
}

function renderAt(path: string) {
  const { hook } = memoryLocation({ path })
  return render(
    <Router hook={hook}>
      <Products />
      <LocationProbe />
    </Router>
  )
}

const locationText = (baseElement: HTMLElement) =>
  baseElement.querySelector('[data-testid="location"]')?.textContent

const dialog = (baseElement: HTMLElement) =>
  [...baseElement.querySelectorAll('[role="dialog"]')].find(
    (element) => element.getAttribute('aria-label') === 'Detalles del producto'
  )

const productPath = '/products/anillos-para-mujer/anillo-de-oro-14k--ab-001'

describe('modal de producto por URL', () => {
  beforeEach(() => {
    products.value = [product]
    loading.value = false
    error.value = 0
  })

  it('abre el modal y actualiza la URL al pulsar una tarjeta', async () => {
    const { baseElement, getByLabelText } = renderAt('/products/anillos-para-mujer')

    expect(locationText(baseElement)).toBe('/products/anillos-para-mujer')

    fireEvent.click(getByLabelText('Ver Anillo de oro 14k'))

    await waitFor(() => expect(locationText(baseElement)).toBe(productPath))
    await waitFor(() => expect(dialog(baseElement)).toBeTruthy())
  })

  it('cierra el modal y vuelve a la URL de la categoría', async () => {
    const { baseElement } = renderAt(productPath)

    await waitFor(() => expect(dialog(baseElement)).toBeTruthy())

    const close = baseElement.querySelector('[aria-label="Cerrar"]') as HTMLButtonElement
    fireEvent.click(close)

    await waitFor(() => expect(locationText(baseElement)).toBe('/products/anillos-para-mujer'))
    await waitFor(() => expect(dialog(baseElement)).toBeUndefined())
  })

  it('abre el modal desde un enlace directo', async () => {
    const { baseElement } = renderAt(productPath)

    await waitFor(() => expect(dialog(baseElement)).toBeTruthy())
    expect(document.title).toBe('Anillo de oro 14k | Frank Joyería')
  })

  it('muestra 404 para un producto inexistente', async () => {
    const { baseElement } = renderAt('/products/anillos-para-mujer/no-existe--zzz')

    await waitFor(() => expect(baseElement.textContent).toContain('Página no encontrada'))
  })

  it('marca la categoría oculta como noindex', async () => {
    products.value = [
      {
        ...product,
        id: 2,
        productId: 'SET-001',
        description: 'anillo componente',
        category: 'Componentes de Conjunto'
      }
    ]

    renderAt('/products/componentes-de-conjunto')

    await waitFor(() =>
      expect(document.head.querySelector('meta[name="robots"]')?.getAttribute('content')).toBe(
        'noindex, noarchive'
      )
    )
  })
})
