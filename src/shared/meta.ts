import { useEffect } from 'preact/hooks'

export const SITE_URL = 'https://frankjoyeriacuba.com'

export const DEFAULT_DESCRIPTION =
  'Frank Joyería: joyas de alta calidad, anillos, cadenas, aretes y más. Compra online en Cuba. Artesanía, elegancia y los mejores precios.'

export const PRODUCTS_TITLE = 'Catálogo de joyas | Frank Joyería'

export const PRODUCTS_DESCRIPTION =
  'Explora nuestro catálogo: anillos, cadenas, aretes, pulseras y más joyas de oro con diseños únicos y precios justos.'

/** Convierte una ruta de wouter en URL canónica absoluta para frankjoyeriacuba.com. */
export function canonicalUrl(path: string): string {
  const [route] = path.split('?')
  const normalized = route && route !== '/' ? `/${route.split('/').filter(Boolean).join('/')}` : '/'
  return SITE_URL + normalized
}

interface PageMeta {
  /** Texto del `<title>` y de `og:title`/`twitter:title`. */
  title: string
  /** Descripción de la página; por defecto usa la del sitio. */
  description?: string
  /** Ruta actual de wouter (sin dominio). */
  path: string
  /** Marca la página con `noindex` (login, dashboard, 404). */
  noIndex?: boolean
}

const setMeta = (kind: 'name' | 'property', key: string, content: string): void => {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${kind}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(kind, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

const setCanonical = (href: string): void => {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/** Aplica `<title>`, canonical y las metas OG/Twitter/robots de la página actual en la SPA. */
export function usePageMeta({ title, description = DEFAULT_DESCRIPTION, path, noIndex = false }: PageMeta): void {
  useEffect(() => {
    document.title = title
    const canonical = canonicalUrl(path)
    setCanonical(canonical)
    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', canonical)
    setMeta('name', 'twitter:title', title)
    setMeta('name', 'twitter:description', description)
    setMeta('name', 'robots', noIndex ? 'noindex, noarchive' : 'index, follow')
  }, [title, description, path, noIndex])
}
