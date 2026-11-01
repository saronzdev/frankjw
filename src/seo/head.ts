import type { JsonLdNode, SeoPage } from './routes'
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  DEFAULT_OG_IMAGE_ALT,
  DEFAULT_OG_IMAGE_HEIGHT,
  DEFAULT_OG_IMAGE_WIDTH,
  SITE_NAME,
  absoluteUrl,
  canonicalUrl
} from './site'

export const SEO_START = '<!-- seo:start -->'
export const SEO_END = '<!-- seo:end -->'

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

export function serializeJsonLd(nodes: JsonLdNode[]): string {
  return JSON.stringify(nodes).replace(/</g, '\\u003c')
}

function meta(attribute: 'name' | 'property', key: string, content: string): string {
  return `    <meta ${attribute}="${key}" content="${escapeHtml(content)}" />`
}

export function renderSeoHead(page: SeoPage): string {
  const description = page.description ?? DEFAULT_DESCRIPTION
  const canonical = canonicalUrl(page.path)
  const image = page.image ? absoluteUrl(page.image) : DEFAULT_OG_IMAGE
  const imageAlt = page.imageAlt ?? DEFAULT_OG_IMAGE_ALT
  const type = page.type ?? 'website'

  const lines = [
    `    <title>${escapeHtml(page.title)}</title>`,
    meta('name', 'description', description),
    `    <link rel="canonical" href="${escapeHtml(canonical)}" />`,
    meta('property', 'og:site_name', SITE_NAME),
    meta('property', 'og:locale', 'es_CU'),
    meta('property', 'og:title', page.title),
    meta('property', 'og:description', description),
    meta('property', 'og:type', type),
    meta('property', 'og:url', canonical),
    meta('property', 'og:image', image),
    meta('property', 'og:image:alt', imageAlt)
  ]

  if (image === DEFAULT_OG_IMAGE) {
    lines.push(
      meta('property', 'og:image:width', DEFAULT_OG_IMAGE_WIDTH),
      meta('property', 'og:image:height', DEFAULT_OG_IMAGE_HEIGHT)
    )
  }

  lines.push(
    meta('name', 'twitter:card', 'summary_large_image'),
    meta('name', 'twitter:title', page.title),
    meta('name', 'twitter:description', description),
    meta('name', 'twitter:image', image),
    meta('name', 'robots', page.noIndex ? 'noindex, noarchive' : 'index, follow')
  )

  if (page.jsonLd && page.jsonLd.length > 0) {
    lines.push(`    <script type="application/ld+json">${serializeJsonLd(page.jsonLd)}</script>`)
  }

  return lines.join('\n')
}

export function replaceSeoHead(html: string, head: string): string {
  const start = html.indexOf(SEO_START)
  const end = html.indexOf(SEO_END)

  if (start < 0 || end < 0 || end < start) {
    throw new Error('SEO markers not found in index.html')
  }

  return `${html.slice(0, start + SEO_START.length)}\n${head}\n    ${html.slice(end)}`
}
