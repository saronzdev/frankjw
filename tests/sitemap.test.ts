import { describe, expect, it } from 'vitest'
import type { ProductType } from '@/types'
import { escapeXml, renderSitemap, sitemapPages } from '@/seo/sitemap'
import { SITE_URL } from '@/seo/site'

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

describe('escapeXml', () => {
  it('escapa los caracteres reservados del XML', () => {
    expect(escapeXml(`a&b<c>d"e'f`)).toBe('a&amp;b&lt;c&gt;d&quot;e&apos;f')
    expect(escapeXml('anillo-de-oro')).toBe('anillo-de-oro')
  })
})

describe('sitemapPages', () => {
  it('incluye marketing, categorías visibles y productos', () => {
    const paths = sitemapPages([product]).map((page) => page.path)

    expect(paths).toContain('/')
    expect(paths).toContain('/products')
    expect(paths).toContain('/about')
    expect(paths).toContain('/contact')
    expect(paths).toContain('/products/anillos-para-mujer')
    expect(paths).toContain('/products/anillos-para-mujer/anillo-de-oro-14k--ab-001')
    expect(paths.some((path) => path.includes('componentes-de-conjunto'))).toBe(false)
  })

  it('incluye productos agotados', () => {
    const paths = sitemapPages([{ ...product, isActive: false }]).map((page) => page.path)
    expect(paths).toContain('/products/anillos-para-mujer/anillo-de-oro-14k--ab-001')
  })
})

describe('renderSitemap', () => {
  it('genera un urlset válido con URLs canónicas absolutas', () => {
    const xml = renderSitemap(sitemapPages([product]))

    expect(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>')).toBe(true)
    expect(xml).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')
    expect(xml).toContain(`<loc>${SITE_URL}/products/anillos-para-mujer/anillo-de-oro-14k--ab-001</loc>`)
    expect(xml.trimEnd().endsWith('</urlset>')).toBe(true)
    expect(xml.match(/<url>/g)).toHaveLength(15)
  })

  it('escapa las URLs antes de escribirlas', () => {
    const xml = renderSitemap([{ title: 'Prueba', path: '/products/a&b' }])
    expect(xml).toContain('<loc>https://frankjoyeriacuba.com/products/a&amp;b</loc>')
  })
})
