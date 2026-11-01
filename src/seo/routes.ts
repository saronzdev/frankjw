import type { Category } from '@/types'
import { CATEGORY_DEFS, HIDDEN_CATEGORY } from '@/data/category-defs'
import { slugify } from '@/data/slug'
import {
  ABOUT_DESCRIPTION,
  ABOUT_TITLE,
  CONTACT_DESCRIPTION,
  CONTACT_TITLE,
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
  PRODUCTS_DESCRIPTION,
  PRODUCTS_TITLE,
  SITE_NAME
} from './site'

export type JsonLdNode = Record<string, unknown>

export interface SeoPage {
  title: string
  description?: string
  path: string
  noIndex?: boolean
  image?: string
  imageAlt?: string
  type?: 'website' | 'product'
  jsonLd?: JsonLdNode[]
}

export function homePage(): SeoPage {
  return { title: DEFAULT_TITLE, description: DEFAULT_DESCRIPTION, path: '/' }
}

export function catalogPage(): SeoPage {
  return { title: PRODUCTS_TITLE, description: PRODUCTS_DESCRIPTION, path: '/products' }
}

export function aboutPage(): SeoPage {
  return { title: ABOUT_TITLE, description: ABOUT_DESCRIPTION, path: '/about' }
}

export function contactPage(): SeoPage {
  return { title: CONTACT_TITLE, description: CONTACT_DESCRIPTION, path: '/contact' }
}

export function marketingPages(): SeoPage[] {
  return [homePage(), catalogPage(), aboutPage(), contactPage()]
}

export function categoryPage(category: Pick<Category, 'title' | 'description'>): SeoPage {
  return {
    title: `${category.title} | Frank Joyería`,
    description: category.description,
    path: `/products/${slugify(category.title)}`
  }
}

export function visibleCategoryDefs() {
  return CATEGORY_DEFS.filter((category) => category.title !== HIDDEN_CATEGORY)
}

export function categoryPages(): SeoPage[] {
  return visibleCategoryDefs().map(categoryPage)
}

export function staticPages(): SeoPage[] {
  return [...marketingPages(), ...categoryPages()]
}

export function shellPage(): SeoPage {
  return {
    title: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    path: '/',
    noIndex: true
  }
}
