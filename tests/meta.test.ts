import { describe, expect, it } from 'vitest'
import {
  DEFAULT_DESCRIPTION,
  PRODUCTS_DESCRIPTION,
  PRODUCTS_TITLE,
  SITE_URL,
  canonicalUrl
} from '@/shared/meta'

describe('canonicalUrl', () => {
  it('genera la raíz para rutas vacías o "/"', () => {
    expect(canonicalUrl('/')).toBe(`${SITE_URL}/`)
    expect(canonicalUrl('')).toBe(`${SITE_URL}/`)
  })

  it('normaliza la ruta y elimina la barra final', () => {
    expect(canonicalUrl('/products')).toBe(`${SITE_URL}/products`)
    expect(canonicalUrl('/products/')).toBe(`${SITE_URL}/products`)
  })

  it('descarta la query y colapsa segmentos vacíos', () => {
    expect(canonicalUrl('/products/anillos?sort=nuevo')).toBe(`${SITE_URL}/products/anillos`)
    expect(canonicalUrl('products/anillos')).toBe(`${SITE_URL}/products/anillos`)
  })
})

describe('metas por defecto', () => {
  it('el título del catálogo es corto y las descripciones no están vacías', () => {
    expect(PRODUCTS_TITLE.length).toBeLessThanOrEqual(60)
    expect(PRODUCTS_TITLE).toContain('Frank Joyería')
    expect(DEFAULT_DESCRIPTION.length).toBeGreaterThan(40)
    expect(PRODUCTS_DESCRIPTION.length).toBeGreaterThan(40)
  })
})
