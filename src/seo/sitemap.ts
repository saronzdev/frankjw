import type { ProductType } from '../types'
import { productRoutes } from './product'
import type { SeoPage } from './routes'
import { categoryPages, marketingPages } from './routes'
import { canonicalUrl } from './site'

const XML_ENTITIES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&apos;'
}

export function escapeXml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => XML_ENTITIES[character] ?? character)
}

export function sitemapPages(products: ProductType[] = []): SeoPage[] {
  return [...marketingPages(), ...categoryPages(), ...productRoutes(products)]
}

export function renderSitemap(pages: SeoPage[]): string {
  const urls = pages
    .map((page) => `  <url>\n    <loc>${escapeXml(canonicalUrl(page.path))}</loc>\n  </url>`)
    .join('\n')

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urls,
    '</urlset>',
    ''
  ].join('\n')
}
