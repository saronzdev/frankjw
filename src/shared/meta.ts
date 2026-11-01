import { useEffect } from 'preact/hooks'
import { serializeJsonLd } from '@/seo/head'
import type { JsonLdNode, SeoPage } from '@/seo/routes'
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  DEFAULT_OG_IMAGE_ALT,
  DEFAULT_OG_IMAGE_HEIGHT,
  DEFAULT_OG_IMAGE_WIDTH,
  SITE_NAME,
  absoluteUrl,
  canonicalUrl
} from '@/seo/site'

export { SITE_URL, DEFAULT_DESCRIPTION, PRODUCTS_TITLE, PRODUCTS_DESCRIPTION, canonicalUrl } from '@/seo/site'

const setMeta = (kind: 'name' | 'property', key: string, content: string): void => {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${kind}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(kind, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

const removeMeta = (kind: 'name' | 'property', key: string): void => {
  document.head.querySelector<HTMLMetaElement>(`meta[${kind}="${key}"]`)?.remove()
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

const syncJsonLd = (route: string, nodes: JsonLdNode[]): void => {
  const scripts = [...document.head.querySelectorAll<HTMLScriptElement>('script[data-seo-route]')]
  const existing = scripts.find((el) => el.dataset.seoRoute === route)

  scripts.forEach((el) => {
    if (el !== existing) el.remove()
  })

  if (nodes.length === 0) {
    existing?.remove()
    return
  }

  const script = existing ?? document.createElement('script')
  if (!existing) {
    script.type = 'application/ld+json'
    script.dataset.seoRoute = route
    document.head.appendChild(script)
  }
  script.textContent = serializeJsonLd(nodes)
}

export function usePageMeta(page: SeoPage): void {
  const {
    title,
    description = DEFAULT_DESCRIPTION,
    path,
    noIndex = false,
    image,
    imageAlt,
    type = 'website',
    jsonLd = []
  } = page
  const jsonLdText = JSON.stringify(jsonLd)

  useEffect(() => {
    const canonical = canonicalUrl(path)
    const imageUrl = image ? absoluteUrl(image) : DEFAULT_OG_IMAGE

    document.title = title
    setCanonical(canonical)
    setMeta('name', 'description', description)
    setMeta('property', 'og:site_name', SITE_NAME)
    setMeta('property', 'og:locale', 'es_CU')
    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', canonical)
    setMeta('property', 'og:type', type)
    setMeta('property', 'og:image', imageUrl)
    setMeta('property', 'og:image:alt', imageAlt ?? DEFAULT_OG_IMAGE_ALT)
    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', title)
    setMeta('name', 'twitter:description', description)
    setMeta('name', 'twitter:image', imageUrl)
    setMeta('name', 'robots', noIndex ? 'noindex, noarchive' : 'index, follow')

    if (imageUrl === DEFAULT_OG_IMAGE) {
      setMeta('property', 'og:image:width', DEFAULT_OG_IMAGE_WIDTH)
      setMeta('property', 'og:image:height', DEFAULT_OG_IMAGE_HEIGHT)
    } else {
      removeMeta('property', 'og:image:width')
      removeMeta('property', 'og:image:height')
    }

    syncJsonLd(path, JSON.parse(jsonLdText) as JsonLdNode[])
  }, [title, description, path, noIndex, image, imageAlt, type, jsonLdText])
}
