import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import type { Plugin } from 'vite'
import { renderSeoHead, replaceSeoHead } from '../src/seo/head'
import { normalizeCatalogProduct, productRoutes } from '../src/seo/product'
import type { SeoPage } from '../src/seo/routes'
import { categoryPages, marketingPages, shellPage } from '../src/seo/routes'
import type { ProductType } from '../src/types'

const CATALOG_TIMEOUT_MS = 5000

export interface PrerenderOptions {
  backendUrl?: string
  failOnCatalogError?: boolean
  skipCatalog?: boolean
}

export function routeOutputPath(route: string): string {
  const segments = route.split('/').filter(Boolean)
  return segments.length === 0 ? 'index.html' : `${segments.join('/')}.html`
}

export function prerenderPages(products: ProductType[] = []): SeoPage[] {
  return [...marketingPages(), ...categoryPages(), ...productRoutes(products)]
}

export function renderRouteHtml(template: string, page: SeoPage): string {
  return replaceSeoHead(template, renderSeoHead(page))
}

export async function fetchCatalog(backendUrl: string, timeoutMs = CATALOG_TIMEOUT_MS): Promise<ProductType[]> {
  const base = backendUrl.replace(/\/+$/, '')
  const response = await fetch(`${base}/api/v1/products`, {
    signal: AbortSignal.timeout(timeoutMs)
  })

  if (!response.ok) {
    throw new Error(`Catalog request failed with status ${response.status}`)
  }

  const data = (await response.json()) as ProductType[]
  return data.map(normalizeCatalogProduct)
}

export async function writePrerenderedPages(
  distDir: string,
  template: string,
  pages: SeoPage[]
): Promise<string[]> {
  const written: string[] = []

  for (const page of pages) {
    const target = join(distDir, routeOutputPath(page.path))
    await mkdir(dirname(target), { recursive: true })
    await writeFile(target, renderRouteHtml(template, page), 'utf8')
    written.push(target)
  }

  return written
}

export function seoPrerender(options: PrerenderOptions = {}): Plugin {
  let root = process.cwd()
  let outDir = 'dist'

  return {
    name: 'frank-seo-prerender',
    apply: 'build',
    configResolved(config) {
      root = config.root
      outDir = config.build.outDir
    },
    async closeBundle() {
      const distDir = join(root, outDir)
      const template = await readFile(join(distDir, 'index.html'), 'utf8')
      let products: ProductType[] = []

      if (!options.skipCatalog) {
        try {
          const backendUrl = options.backendUrl ?? process.env.VITE_BACKEND_URL ?? 'http://localhost:3000'
          products = await fetchCatalog(backendUrl)
        } catch (error) {
          const message = error instanceof Error ? error.message : String(error)
          if (options.failOnCatalogError) throw error
          this.warn(`Skipping product prerender: ${message}`)
        }
      }

      const pages = prerenderPages(products)
      await writePrerenderedPages(distDir, template, pages)
      await writeFile(join(distDir, 'shell.html'), renderRouteHtml(template, shellPage()), 'utf8')
      this.info(`Prerendered ${pages.length} routes and shell.html`)
    }
  }
}
