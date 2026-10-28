// @vitest-environment happy-dom
import { describe, expect, it } from 'vitest'
import { fireEvent, render, waitFor } from '@testing-library/preact'
import { ProductCard } from '@/components/products/ProductCard'
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
  pictures: ['https://yfayxxxtvbxdfhtidhcs.supabase.co/storage/v1/object/public/pictures/a.jpg']
}

describe('ProductCard accesibilidad', () => {
  it('el activador del modal es un botón con aria-label y la imagen tiene alt', () => {
    const { baseElement } = render(<ProductCard data={product} />)
    const trigger = baseElement.querySelector('button[aria-label="Ver Anillo de oro 14k"]')
    expect(trigger).toBeTruthy()
    expect(trigger?.getAttribute('aria-haspopup')).toBe('dialog')
    expect(trigger?.getAttribute('type')).toBe('button')
    expect(baseElement.querySelector('img[alt="Anillo de oro 14k"]')).toBeTruthy()
    expect(baseElement.querySelector('[aria-label="Contiene piedras preciosas"]')).toBeNull()
  })

  it('muestra el badge compacto cuando la prenda contiene piedras preciosas', () => {
    const { baseElement } = render(<ProductCard data={{ ...product, hasPreciousStones: true }} />)
    const badge = baseElement.querySelector('[aria-label="Contiene piedras preciosas"]')
    expect(badge).toBeTruthy()
    expect(badge?.textContent).toContain('Piedras')
  })

  it('abre el ProductPopup (role=dialog) al pulsar el activador', async () => {
    const { baseElement } = render(<ProductCard data={product} />)
    const trigger = baseElement.querySelector('button[aria-label]') as HTMLButtonElement
    const dialogsBefore = baseElement.querySelectorAll('[role="dialog"]').length
    fireEvent.click(trigger)
    await waitFor(() => {
      const dialogs = [...baseElement.querySelectorAll('[role="dialog"]')].filter(
        (el) => (el as HTMLElement).getAttribute('aria-label') === 'Detalles del producto'
      )
      if (dialogs.length <= dialogsBefore) throw new Error('dialog not ready')
    })
    expect([...baseElement.querySelectorAll('[role=dialog]')].some((el) => (el as HTMLElement).getAttribute('aria-label') === 'Detalles del producto')).toBe(true)
  })
})
