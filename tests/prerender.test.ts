import { mkdtemp, readFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import type { ProductType } from '@/types'
import type { SeoPage } from '@/seo/routes'
import { SEO_END, SEO_START } from '@/seo/head'
import { shellPage } from '@/seo/routes'
import { prerenderPages, renderRouteHtml, routeOutputPath, writePrerenderedPages } from '../build/seo-prerender'

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

const template = `<!doctype html><html><head>
${SEO_START}
    <title>Viejo</title>
${SEO_END}
</head><body><div id="app"></div></body></html>`

const temporaryDirs: string[] = []

afterEach(async () => {
  await Promise.all(temporaryDirs.splice(0).map((dir) => rm(dir, { recursive: true, force: true })))
})

describe('routeOutputPath', () => {
  it('convierte rutas limpias en archivos html', () => {
    expect(routeOutputPath('/')).toBe('index.html')
    expect(routeOutputPath('/products')).toBe('products.html')
    expect(routeOutputPath('/products/anillos-para-mujer')).toBe('products/anillos-para-mujer.html')
    expect(routeOutputPath('/products/anillos-para-mujer/anillo-de-oro-14k--ab-001')).toBe(
      'products/anillos-para-mujer/anillo-de-oro-14k--ab-001.html'
    )
  })

  it('tolera barras repetidas y finales', () => {
    expect(routeOutputPath('/about/')).toBe('about.html')
    expect(routeOutputPath('//products//cadenas//')).toBe('products/cadenas.html')
  })
})

describe('prerenderPages', () => {
  it('suma marketing, categorías visibles y productos', () => {
    const pages = prerenderPages([product])
    const paths = pages.map((page) => page.path)

    expect(paths).toContain('/')
    expect(paths).toContain('/products')
    expect(paths).toContain('/products/anillos-para-mujer')
    expect(paths).toContain('/products/anillos-para-mujer/anillo-de-oro-14k--ab-001')
    expect(paths).toHaveLength(4 + 10 + 1)
    expect(new Set(paths).size).toBe(paths.length)
  })

  it('excluye la categoría oculta de rutas y productos', () => {
    const hidden: ProductType = {
      ...product,
      id: 2,
      productId: 'SET-001',
      category: 'Componentes de Conjunto'
    }
    const paths = prerenderPages([product, hidden]).map((page) => page.path)

    expect(paths.some((path) => path.includes('componentes-de-conjunto'))).toBe(false)
    expect(paths).not.toContain('/products/componentes-de-conjunto')
  })
})

describe('renderRouteHtml', () => {
  it('reemplaza solo el bloque SEO del template', () => {
    const page: SeoPage = { title: 'Anillo | Frank Joyería', path: '/products/anillos/anillo' }
    const html = renderRouteHtml(template, page)

    expect(html).toContain('<title>Anillo | Frank Joyería</title>')
    expect(html).not.toContain('<title>Viejo</title>')
    expect(html).toContain('<div id="app"></div>')
    expect(html).toContain(SEO_START)
    expect(html).toContain(SEO_END)
  })

  it('genera el shell con noindex', () => {
    const html = renderRouteHtml(template, shellPage())
    expect(html).toContain('name="robots" content="noindex, noarchive"')
  })
})

describe('writePrerenderedPages', () => {
  it('crea un archivo por ruta con su head', async () => {
    const distDir = await mkdtemp(join(tmpdir(), 'frank-seo-'))
    temporaryDirs.push(distDir)
    const pages: SeoPage[] = [
      { title: 'Inicio', path: '/' },
      { title: 'Cadenas | Frank Joyería', path: '/products/cadenas' }
    ]

    const written = await writePrerenderedPages(distDir, template, pages)
    expect(written).toHaveLength(2)

    const home = await readFile(join(distDir, 'index.html'), 'utf8')
    const category = await readFile(join(distDir, 'products', 'cadenas.html'), 'utf8')
    expect(home).toContain('<title>Inicio</title>')
    expect(category).toContain('<title>Cadenas | Frank Joyería</title>')
    expect(category).toContain('href="https://frankjoyeriacuba.com/products/cadenas"')
  })
})
