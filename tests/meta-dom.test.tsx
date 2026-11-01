// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { cleanup, renderHook, waitFor } from '@testing-library/preact'
import type { ProductType } from '@/types'
import { productSeo } from '@/seo/product'
import { DEFAULT_OG_IMAGE, SITE_URL } from '@/seo/site'
import { usePageMeta } from '@/shared/meta'

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

const meta = (key: string, attribute = 'property') =>
  document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`)?.content

const canonical = () => document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href

describe('usePageMeta', () => {
  beforeEach(() => {
    document.head.innerHTML = ''
  })

  afterEach(() => {
    cleanup()
  })

  it('aplica la meta de producto y elimina las dimensiones por defecto', async () => {
    document.head.innerHTML =
      '<meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">'

    const seo = productSeo(product)
    renderHook(() => usePageMeta(seo!))

    await waitFor(() => expect(document.title).toBe('Anillo de oro 14k | Frank Joyería'))
    expect(canonical()).toBe(`${SITE_URL}/products/anillos-para-mujer/anillo-de-oro-14k--ab-001`)
    expect(meta('og:image')).toBe('https://cdn.example.com/anillo.jpg')
    expect(meta('og:type')).toBe('product')
    expect(meta('og:image:width')).toBeUndefined()
    expect(meta('og:image:height')).toBeUndefined()
    expect(meta('robots', 'name')).toBe('index, follow')
  })

  it('serializa el JSON-LD y lo retira al cambiar a una página sin datos estructurados', async () => {
    const { rerender } = renderHook(({ page }) => usePageMeta(page), {
      initialProps: { page: productSeo(product)! }
    })

    await waitFor(() => {
      expect(document.head.querySelectorAll('script[type="application/ld+json"]')).toHaveLength(1)
    })
    const script = document.head.querySelector('script[type="application/ld+json"]')
    const nodes = JSON.parse(script?.textContent ?? '[]')
    expect(nodes[0]['@type']).toBe('Product')

    rerender({ page: { title: 'Catálogo', path: '/products' } })

    await waitFor(() => {
      expect(document.head.querySelectorAll('script[type="application/ld+json"]')).toHaveLength(0)
    })
    expect(meta('og:image')).toBe(DEFAULT_OG_IMAGE)
    expect(meta('og:image:width')).toBe('1200')
  })

  it('marca noindex y conserva la imagen social por defecto', async () => {
    renderHook(() => usePageMeta({ title: 'Login', path: '/login', noIndex: true }))

    await waitFor(() => expect(meta('robots', 'name')).toBe('noindex, noarchive'))
    expect(meta('og:image')).toBe(DEFAULT_OG_IMAGE)
    expect(canonical()).toBe(`${SITE_URL}/login`)
  })
})
