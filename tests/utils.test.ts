import { describe, expect, it } from 'vitest'
import type { ProductType } from '@/types'
import {
  buildSrcSet,
  filterAndSortProducts,
  getErrorMessage,
  isValidEmail,
  normalize,
  optimizeImage,
  shouldRetry,
  slugify,
  unslugify,
  CATEGORIES
} from '@/shared/utils'

const makeProduct = (overrides: Partial<ProductType>): ProductType => ({
  id: 0,
  productId: '00000000-0000-0000-0000-000000000000',
  description: 'Producto de prueba',
  category: 'Anillos para mujer',
  price: 100,
  weight: 1,
  karats: [14],
  isActive: true,
  sales: 0,
  hasDiscount: false,
  createdAt: 0,
  ...overrides
})

describe('slugify / unslugify', () => {
  it('convierte títulos a slugs', () => {
    expect(slugify('Anillos para mujer')).toBe('anillos-para-mujer')
    expect(slugify('  Pendientes y argollas! ')).toBe('pendientes-y-argollas')
  })

  it('hace round-trip con los títulos de CATEGORIES', () => {
    for (const cat of CATEGORIES) {
      expect(unslugify(slugify(cat.title))).toBe(cat.title)
    }
  })

  it('devuelve cadena vacía para slugs desconocidos', () => {
    expect(unslugify('categoria-inexistente')).toBe('')
  })
})

describe('normalize', () => {
  it('capitaliza el primer carácter y minúsculas el resto', () => {
    expect(normalize('HOLA')).toBe('Hola')
    expect(normalize('anillos')).toBe('Anillos')
  })
})

describe('isValidEmail', () => {
  it('acepta correos válidos', () => {
    expect(isValidEmail('ronald@protonmail.com')).toBe(true)
  })

  it('rechaza correos inválidos', () => {
    expect(isValidEmail('ronald@')).toBe(false)
    expect(isValidEmail('sin-arroba.com')).toBe(false)
    expect(isValidEmail('t r o s @mail.com')).toBe(false)
  })
})

describe('shouldRetry', () => {
  it('reintenta en códigos transitorios', () => {
    expect(shouldRetry(1000)).toBe(true)
    expect(shouldRetry(1)).toBe(true)
    expect(shouldRetry(3001)).toBe(true)
    expect(shouldRetry(3002)).toBe(true)
  })

  it('no reintenta en códigos permanentes o indefinidos', () => {
    expect(shouldRetry(1101)).toBe(false)
    expect(shouldRetry(1002)).toBe(false)
    expect(shouldRetry(undefined)).toBe(false)
  })
})

describe('optimizeImage / buildSrcSet', () => {
  const supabase =
    'https://supabase.co/storage/v1/object/public/images/anillo.avif'
  const externa = 'https://cdn.example.com/anillo.avif'

  it('transforma imágenes de Supabase', () => {
    expect(optimizeImage(supabase, 320)).toBe(`${supabase}?width=320&quality=60`)
    expect(optimizeImage(supabase, 480, 80)).toBe(`${supabase}?width=480&quality=80`)
  })

  it('deja intactas las imágenes externas', () => {
    expect(optimizeImage(externa, 320)).toBe(externa)
    expect(buildSrcSet(externa)).toBeUndefined()
  })

  it('genera un srcSet para Supabase', () => {
    expect(buildSrcSet(supabase, [320, 640])).toBe(
      [`${supabase}?width=320&quality=60 320w`, `${supabase}?width=640&quality=60 640w`].join(', ')
    )
  })
})

describe('getErrorMessage', () => {
  it('mapea códigos conocidos a mensajes en español', () => {
    expect(getErrorMessage(1002)).toBe('Credenciales inválidas. Verifica tu correo y contraseña.')
    expect(getErrorMessage(1000)).toBe('No se pudo conectar al servidor. Verifica tu conexión a internet.')
  })

  it('tiene un mensaje por defecto para códigos desconocidos', () => {
    expect(getErrorMessage(9999)).toBe('Ha ocurrido un error inesperado. Intenta de nuevo.')
  })
})

describe('filterAndSortProducts', () => {
  const products = [
    makeProduct({ id: 1, description: 'Anillo a', price: 300, offerPrice: 250, karats: [14], weight: 2, createdAt: 100 }),
    makeProduct({ id: 2, description: 'Anillo b', price: 200, karats: [18], weight: 5, createdAt: 300 }),
    makeProduct({ id: 3, description: 'Anillo c', price: 500, karats: [14, 18], weight: Number.NaN, createdAt: 200 }),
    makeProduct({ id: 4, description: 'Anillo d', price: 800, offerPrice: 700, karats: [], weight: 1, createdAt: 400 })
  ]

  it('filtra por rango de precio usando la oferta si existe', () => {
    const [a] = filterAndSortProducts(products, { priceRange: [240, 260] })
    expect(a?.id).toBe(1)
  })

  it('filtra por kilates', () => {
    const ids = filterAndSortProducts(products, { selectedKarats: [18] }).map((p) => p.id)
    expect(ids.sort()).toEqual([2, 3])
  })

  it('filtra ofertas reales', () => {
    const ids = filterAndSortProducts(products, { onSale: true }).map((p) => p.id)
    expect(ids.sort()).toEqual([1, 4])
  })

  it('ordena por precio ascendente y descendente', () => {
    expect(filterAndSortProducts(products, { sortBy: 'price-asc' }).map((p) => p.id)).toEqual([2, 1, 3, 4])
    expect(filterAndSortProducts(products, { sortBy: 'price-desc' }).map((p) => p.id)).toEqual([4, 3, 1, 2])
  })

  it('ordena por nombre', () => {
    expect(filterAndSortProducts(products, { sortBy: 'name' }).map((p) => p.id)).toEqual([1, 2, 3, 4])
  })

  it('ordena por peso descendente poniendo inválidos al final', () => {
    const ids = filterAndSortProducts(products, { sortBy: 'weight' }).map((p) => p.id)
    expect(ids[0]).toBe(2)
    expect(ids.at(-1)).toBe(3)
  })

  it('usa el orden por defecto (createdAt desc)', () => {
    expect(filterAndSortProducts(products, {}).map((p) => p.id)).toEqual([4, 2, 3, 1])
  })

  it('no muta la lista original', () => {
    const original = [...products]
    filterAndSortProducts(products, { sortBy: 'price-asc' })
    expect(products).toEqual(original)
  })

  it('filtra por un solo kilate sin reordenar', () => {
    const lista = [makeProduct({ id: 10, karats: [9] }), makeProduct({ id: 11, karats: [9, 14] })]
    const resultado = filterAndSortProducts(lista, { selectedKarats: [9] })
    expect(resultado.map((p) => p.id)).toEqual([10, 11])
  })
})
