import type { ProductType } from '../types'
import { findCategoryDef, HIDDEN_CATEGORY } from '../data/category-defs'
import { slugify } from '../data/slug'
import { normalize } from '../shared/text'
import type { JsonLdNode, SeoPage } from './routes'
import { PRODUCTS_DESCRIPTION, SITE_NAME, SITE_URL, absoluteUrl, canonicalUrl } from './site'

export const PRODUCT_ID_SEPARATOR = '--'

const MAX_SLUG_LENGTH = 60
const MAX_DESCRIPTION_LENGTH = 160

export function productName(description: string): string {
  const [head] = description.split(',')
  const base = head?.trim() ?? ''
  return base ? normalize(base) : 'Producto'
}

export function slugifyText(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-{2,}/g, '-')
    .replace(/^-+|-+$/g, '')
}

function truncateSlug(value: string, maxLength: number): string {
  if (value.length <= maxLength) return value
  const cut = value.slice(0, maxLength + 1)
  const lastDash = cut.lastIndexOf('-')
  const trimmed = lastDash > 0 ? cut.slice(0, lastDash) : value.slice(0, maxLength)
  return trimmed.replace(/-+$/, '')
}

function truncateText(value: string, maxLength: number): string {
  const text = value.trim().replace(/\s+/g, ' ')
  if (text.length <= maxLength) return text
  const cut = text.slice(0, maxLength + 1)
  const lastSpace = cut.lastIndexOf(' ')
  const trimmed = lastSpace > 0 ? cut.slice(0, lastSpace) : text.slice(0, maxLength)
  return `${trimmed.trim()}...`
}

export function productSlugBase(description: string): string {
  return truncateSlug(slugifyText(productName(description)), MAX_SLUG_LENGTH) || 'producto'
}

export function productIdSlug(product: Pick<ProductType, 'id' | 'productId'>): string {
  return slugifyText(product.productId) || `p${product.id}`
}

export function productSlug(product: Pick<ProductType, 'id' | 'productId' | 'description'>): string {
  return `${productSlugBase(product.description)}${PRODUCT_ID_SEPARATOR}${productIdSlug(product)}`
}

export function productPath(product: ProductType): string | null {
  const category = findCategoryDef(product.category)
  if (!category) return null
  return `/products/${slugify(category.title)}/${productSlug(product)}`
}

export function visibleProducts(products: ProductType[]): ProductType[] {
  return products.filter((product) => {
    const category = findCategoryDef(product.category)
    return Boolean(category && category.title !== HIDDEN_CATEGORY)
  })
}

export function normalizeCatalogProduct(product: ProductType): ProductType {
  return {
    ...product,
    karats: Array.isArray(product.karats) ? product.karats : [],
    pictures: Array.isArray(product.pictures) ? product.pictures : [],
    isActive: Boolean(product.isActive),
    hasPreciousStones: Boolean(product.hasPreciousStones)
  }
}

function isHttpUrl(value: string): boolean {
  return /^https?:\/\//i.test(value)
}

function breadcrumbNode(categoryTitle: string, categorySlug: string, productUrl: string, name: string): JsonLdNode {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE_URL}/` },
      {
        '@type': 'ListItem',
        position: 2,
        name: categoryTitle,
        item: canonicalUrl(`/products/${categorySlug}`)
      },
      { '@type': 'ListItem', position: 3, name, item: productUrl }
    ]
  }
}

export function productSeo(product: ProductType): SeoPage | null {
  const path = productPath(product)
  const category = findCategoryDef(product.category)

  if (!path || !category) return null

  const name = productName(product.description)
  const images = (product.pictures ?? []).filter(isHttpUrl)
  const image = images[0]
  const price = product.hasDiscount && product.offerPrice ? product.offerPrice : product.price
  const url = canonicalUrl(path)

  const productNode: JsonLdNode = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description: product.description,
    sku: product.productId,
    category: category.title,
    brand: { '@type': 'Brand', name: SITE_NAME },
    offers: {
      '@type': 'Offer',
      url,
      priceCurrency: 'USD',
      price,
      availability: product.isActive ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock'
    }
  }

  if (images.length > 0) {
    productNode.image = images.slice(0, 3).map(absoluteUrl)
  }

  return {
    title: `${name} | ${SITE_NAME}`,
    description: truncateText(product.description, MAX_DESCRIPTION_LENGTH),
    path,
    image,
    imageAlt: name,
    type: 'product',
    jsonLd: [productNode, breadcrumbNode(category.title, slugify(category.title), url, name)]
  }
}

export function productRoutes(products: ProductType[]): SeoPage[] {
  return visibleProducts(products).flatMap((product) => {
    const page = productSeo(product)
    return page ? [page] : []
  })
}

export function productFallbackPage(categorySlug: string, slug: string): SeoPage {
  const [base] = slug.split(PRODUCT_ID_SEPARATOR)
  const name = base ? normalize(base.replace(/-/g, ' ')) : 'Producto'

  return {
    title: `${name} | ${SITE_NAME}`,
    description: PRODUCTS_DESCRIPTION,
    path: `/products/${categorySlug}/${slug}`
  }
}

export interface ResolvedProduct {
  product: ProductType
  canonicalPath: string
  categorySlug: string
  needsRedirect: boolean
}

export function findProductBySlug(
  products: ProductType[],
  categorySlug: string,
  slug: string
): ResolvedProduct | null {
  const category = findCategoryDef(categorySlug)
  const canonicalSlug = slug.trim()
  if (!category || !canonicalSlug) return null

  const byCanonical = products.find((product) => productSlug(product) === canonicalSlug)
  const separatorIndex = canonicalSlug.lastIndexOf(PRODUCT_ID_SEPARATOR)
  const idPart = separatorIndex >= 0 ? canonicalSlug.slice(separatorIndex + PRODUCT_ID_SEPARATOR.length).toLowerCase() : ''
  const byId = idPart
    ? products.find((product) => productIdSlug(product).toLowerCase() === idPart)
    : undefined
  const product = byCanonical ?? byId

  if (!product) return null

  const path = productPath(product)
  const productCategory = findCategoryDef(product.category)

  if (!path || !productCategory || productCategory.title === HIDDEN_CATEGORY) return null

  const expectedCategorySlug = slugify(productCategory.title)
  const currentPath = `/products/${categorySlug}/${canonicalSlug}`

  return {
    product,
    canonicalPath: path,
    categorySlug: expectedCategorySlug,
    needsRedirect: path !== currentPath
  }
}
