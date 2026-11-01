import { describe, expect, it } from 'vitest'
import type { ProductType } from '@/types'
import {
  findProductBySlug,
  normalizeCatalogProduct,
  productFallbackPage,
  productName,
  productPath,
  productRoutes,
  productSeo,
  productSlug,
  productSlugBase,
  slugifyText,
  visibleProducts
} from '@/seo/product'
import { SITE_URL } from '@/seo/site'

const makeProduct = (overrides: Partial<ProductType> = {}): ProductType => ({
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
  pictures: ['https://cdn.example.com/anillo.jpg'],
  ...overrides
})

describe('slug de producto', () => {
  it('normaliza acentos, ñ y signos', () => {
    expect(slugifyText('Añillo Ñandú de Oro')).toBe('anillo-nandu-de-oro')
    expect(slugifyText('  Anillo   &  Zafiro!! ')).toBe('anillo-zafiro')
  })

  it('usa el nombre visible y el productId con separador doble', () => {
    expect(productName('anillo de oro 14k, talla 7')).toBe('Anillo de oro 14k')
    expect(productSlug(makeProduct())).toBe('anillo-de-oro-14k--ab-001')
  })

  it('sanea productId con guiones y espacios', () => {
    expect(productSlug(makeProduct({ productId: ' AB 001 ' }))).toBe('anillo-de-oro-14k--ab-001')
    expect(productSlug(makeProduct({ productId: '---' }))).toBe('anillo-de-oro-14k--p1')
  })

  it('cae en "producto" cuando la descripción no tiene texto útil', () => {
    expect(productSlugBase('¿¿, talla 7')).toBe('producto')
    expect(productSlug(makeProduct({ description: ',,,' }))).toBe('producto--ab-001')
  })

  it('recorta nombres largos sin pasar del límite', () => {
    const long = 'anillo de oro con un diseño artesanal muy largo y detallado para cada ocasión especial'
    const slug = productSlugBase(long)
    expect(slug.length).toBeLessThanOrEqual(60)
    expect(slug.endsWith('-')).toBe(false)
  })
})

describe('productPath', () => {
  it('resuelve la categoría y genera la ruta canónica', () => {
    expect(productPath(makeProduct())).toBe('/products/anillos-para-mujer/anillo-de-oro-14k--ab-001')
  })

  it('devuelve null si la categoría no existe', () => {
    expect(productPath(makeProduct({ category: 'Inexistente' }))).toBeNull()
  })
})

describe('findProductBySlug', () => {
  const products = [
    makeProduct(),
    makeProduct({ id: 2, productId: 'AB-002', description: 'cadena de oro 18k', category: 'Cadenas' }),
    makeProduct({
      id: 3,
      productId: 'SET-001',
      description: 'anillo componente',
      category: 'Componentes de Conjunto'
    })
  ]

  it('encuentra el slug canónico sin redirección', () => {
    const resolved = findProductBySlug(products, 'anillos-para-mujer', 'anillo-de-oro-14k--ab-001')
    expect(resolved?.product.id).toBe(1)
    expect(resolved?.needsRedirect).toBe(false)
  })

  it('resuelve por productId cuando el nombre cambió', () => {
    const resolved = findProductBySlug(products, 'anillos-para-mujer', 'anillo-antiguo--ab-001')
    expect(resolved?.product.id).toBe(1)
    expect(resolved?.canonicalPath).toBe('/products/anillos-para-mujer/anillo-de-oro-14k--ab-001')
    expect(resolved?.needsRedirect).toBe(true)
  })

  it('redirige si el producto está en otra categoría', () => {
    const resolved = findProductBySlug(products, 'cadenas', 'anillo-de-oro-14k--ab-001')
    expect(resolved?.product.id).toBe(1)
    expect(resolved?.categorySlug).toBe('anillos-para-mujer')
    expect(resolved?.needsRedirect).toBe(true)
  })

  it('devuelve null para categoría o producto desconocidos', () => {
    expect(findProductBySlug(products, 'inexistente', 'anillo-de-oro-14k--ab-001')).toBeNull()
    expect(findProductBySlug(products, 'anillos-para-mujer', 'anillo--ab-999')).toBeNull()
    expect(findProductBySlug(products, 'anillos-para-mujer', '')).toBeNull()
  })

  it('excluye productos de la categoría oculta', () => {
    expect(findProductBySlug(products, 'componentes-de-conjunto', 'anillo-componente--set-001')).toBeNull()
  })
})

describe('productSeo', () => {
  it('genera title, description, canonical, imagen y JSON-LD', () => {
    const seo = productSeo(makeProduct())
    expect(seo).not.toBeNull()
    if (!seo) return

    expect(seo.title).toBe('Anillo de oro 14k | Frank Joyería')
    expect(seo.description).toBe('anillo de oro 14k, talla 7')
    expect(seo.path).toBe('/products/anillos-para-mujer/anillo-de-oro-14k--ab-001')
    expect(seo.image).toBe('https://cdn.example.com/anillo.jpg')
    expect(seo.type).toBe('product')

    const [productNode, breadcrumb] = seo.jsonLd ?? []
    expect(productNode?.['@type']).toBe('Product')
    expect(productNode?.sku).toBe('AB-001')
    expect(productNode?.offers).toMatchObject({
      price: 100,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock'
    })
    expect(breadcrumb?.['@type']).toBe('BreadcrumbList')
  })

  it('usa el precio de oferta y marca los agotados', () => {
    const seo = productSeo(makeProduct({ hasDiscount: true, offerPrice: 80, isActive: false }))
    const [productNode] = seo?.jsonLd ?? []
    expect(productNode?.offers).toMatchObject({
      price: 80,
      availability: 'https://schema.org/OutOfStock'
    })
  })

  it('omite la imagen y recorta descripciones largas', () => {
    const description = `${'anillo '.repeat(30)}final`
    const seo = productSeo(makeProduct({ pictures: [], description }))
    expect(seo?.image).toBeUndefined()
    expect(seo?.description?.length).toBeLessThanOrEqual(163)
    expect(seo?.description?.endsWith('...')).toBe(true)
  })

  it('devuelve null para categorías desconocidas', () => {
    expect(productSeo(makeProduct({ category: 'Inexistente' }))).toBeNull()
  })
})

describe('productRoutes y catálogo visible', () => {
  it('excluye categorías ocultas o desconocidas', () => {
    const list = [
      makeProduct(),
      makeProduct({ id: 2, productId: 'SET-001', category: 'Componentes de Conjunto' }),
      makeProduct({ id: 3, productId: 'X-001', category: 'Inexistente' })
    ]
    expect(visibleProducts(list).map((product) => product.id)).toEqual([1])
    expect(productRoutes(list).map((page) => page.path)).toEqual([
      '/products/anillos-para-mujer/anillo-de-oro-14k--ab-001'
    ])
  })

  it('normaliza los campos que llegan como texto o nulos', () => {
    const product = normalizeCatalogProduct({
      ...makeProduct(),
      karats: '14' as unknown as number[],
      pictures: undefined as unknown as string[],
      isActive: 0 as unknown as boolean,
      hasPreciousStones: 1 as unknown as boolean
    })
    expect(product.karats).toEqual([])
    expect(product.pictures).toEqual([])
    expect(product.isActive).toBe(false)
    expect(product.hasPreciousStones).toBe(true)
  })
})

describe('productFallbackPage', () => {
  it('deriva un título legible del slug mientras carga', () => {
    const page = productFallbackPage('anillos-para-mujer', 'anillo-de-oro-14k--ab-001')
    expect(page.title).toBe('Anillo de oro 14k | Frank Joyería')
    expect(page.path).toBe('/products/anillos-para-mujer/anillo-de-oro-14k--ab-001')
    expect(page.description?.length).toBeGreaterThan(40)
    expect(SITE_URL).toContain('frankjoyeriacuba.com')
  })
})
