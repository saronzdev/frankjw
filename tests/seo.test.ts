import { describe, expect, it } from 'vitest'
import { CATEGORIES, HIDDEN_CATEGORY } from '@/data/categories'
import { CATEGORY_DEFS } from '@/data/category-defs'
import { SEO_END, SEO_START, renderSeoHead, replaceSeoHead } from '@/seo/head'
import { categoryPages, marketingPages, shellPage, staticPages } from '@/seo/routes'
import { DEFAULT_OG_IMAGE, SITE_URL, canonicalUrl } from '@/seo/site'

describe('datos de categorías', () => {
  it('mantiene la copia y las imágenes alineadas con CATEGORY_DEFS', () => {
    expect(CATEGORIES).toHaveLength(CATEGORY_DEFS.length)
    expect(CATEGORIES.every((category) => Boolean(category.img))).toBe(true)
    expect(CATEGORIES.map((category) => category.title)).toEqual(CATEGORY_DEFS.map((category) => category.title))
    expect(CATEGORIES.map((category) => category.order)).toEqual(CATEGORY_DEFS.map((category) => category.order))
    expect(CATEGORIES.map((category) => category.description)).toEqual(
      CATEGORY_DEFS.map((category) => category.description)
    )
  })
})

describe('rutas SEO', () => {
  it('incluye marketing y todas las categorías visibles', () => {
    const pages = staticPages()
    const paths = pages.map((page) => page.path)

    expect(paths).toContain('/')
    expect(paths).toContain('/products')
    expect(paths).toContain('/about')
    expect(paths).toContain('/contact')
    expect(new Set(paths).size).toBe(paths.length)
    expect(paths).toHaveLength(4 + CATEGORY_DEFS.length - 1)
  })

  it('excluye la categoría oculta de las páginas de categoría', () => {
    const paths = categoryPages().map((page) => page.path)
    expect(paths.every((path) => !path.includes('componentes-de-conjunto'))).toBe(true)
    expect(marketingPages().map((page) => page.path)).toEqual(['/', '/products', '/about', '/contact'])
    expect(HIDDEN_CATEGORY).toBe('Componentes de Conjunto')
  })

  it('marca el shell como no indexable', () => {
    expect(shellPage().noIndex).toBe(true)
  })
})

describe('renderSeoHead', () => {
  it('genera title, canonical, Open Graph y Twitter por defecto', () => {
    const html = renderSeoHead({ title: 'Prueba', path: '/about' })

    expect(html).toContain('<title>Prueba</title>')
    expect(html).toContain(`<link rel="canonical" href="${SITE_URL}/about" />`)
    expect(html).toContain('property="og:url" content="https://frankjoyeriacuba.com/about"')
    expect(html).toContain('property="og:type" content="website"')
    expect(html).toContain(`property="og:image" content="${DEFAULT_OG_IMAGE}"`)
    expect(html).toContain('property="og:image:width" content="1200"')
    expect(html).toContain('name="twitter:card" content="summary_large_image"')
    expect(html).toContain('name="robots" content="index, follow"')
  })

  it('usa la imagen del producto sin dimensiones fijas', () => {
    const image = 'https://cdn.example.com/anillo.jpg'
    const html = renderSeoHead({ title: 'Anillo', path: '/products/anillos/anillo', image, type: 'product' })

    expect(html).toContain(`property="og:image" content="${image}"`)
    expect(html).not.toContain('og:image:width')
    expect(html).toContain('property="og:type" content="product"')
  })

  it('escapa atributos y serializa JSON-LD sin cerrar el script', () => {
    const html = renderSeoHead({
      title: 'Anillo & "zafiro"',
      path: '/products/anillos/anillo',
      description: 'Detalle <script>alert(1)</script>',
      jsonLd: [{ '@type': 'Product', name: '</script><script>alert(1)</script>' }]
    })

    expect(html).toContain('Anillo &amp; &quot;zafiro&quot;')
    expect(html).toContain('Detalle &lt;script&gt;alert(1)&lt;/script&gt;')
    expect(html).not.toContain('</script><script>alert(1)</script>')
    expect(html).toContain('\\u003c/script>')
  })

  it('marca noindex cuando la página lo pide', () => {
    expect(renderSeoHead({ title: 'Login', path: '/login', noIndex: true })).toContain(
      'name="robots" content="noindex, noarchive"'
    )
  })
})

describe('replaceSeoHead', () => {
  const base = `<!doctype html><html><head>\n${SEO_START}\n    <title>Viejo</title>\n${SEO_END}\n</head></html>`

  it('sustituye solo el bloque marcado', () => {
    const html = replaceSeoHead(base, renderSeoHead({ title: 'Nuevo', path: '/' }))
    expect(html).not.toContain('<title>Viejo</title>')
    expect(html).toContain('<title>Nuevo</title>')
    expect(html).toContain(SEO_START)
    expect(html).toContain(SEO_END)
  })

  it('es idempotente', () => {
    const head = renderSeoHead({ title: 'Nuevo', path: '/' })
    const once = replaceSeoHead(base, head)
    const twice = replaceSeoHead(once, head)
    expect(twice).toBe(once)
  })

  it('falla si faltan los marcadores', () => {
    expect(() => replaceSeoHead('<head></head>', '<title>x</title>')).toThrow()
  })
})

describe('canonicalUrl', () => {
  it('normaliza barras y descarta la query', () => {
    expect(canonicalUrl('/products/anillos/?sort=precio')).toBe(`${SITE_URL}/products/anillos`)
    expect(canonicalUrl('')).toBe(`${SITE_URL}/`)
  })
})