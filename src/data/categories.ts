import type { Category } from '@/types'
import catAnillosCompromisoHombre from '@/assets/cat-anillos-compromiso-hombre.avif'
import catAnillosCompromisoMujer from '@/assets/cat-anillos-compromiso-mujer.avif'
import catAnillosHombre from '@/assets/cat-anillos-hombre.avif'
import catAnillosMujer from '@/assets/cat-anillos-mujer.avif'
import catCadenas from '@/assets/cat-cadenas.avif'
import catDijes from '@/assets/cat-dijes.avif'
import catGargantillas from '@/assets/cat-gargantillas.avif'
import catPendientes from '@/assets/cat-pendientes.avif'
import catPulseras from '@/assets/cat-pulseras.avif'
import catSets from '@/assets/cat-sets.avif'
import { CATEGORY_DEFS, HIDDEN_CATEGORY } from './category-defs'
import { slugify } from './slug'

const CATEGORY_IMAGES: Record<string, string> = {
  'cat-anillos-compromiso-hombre.avif': catAnillosCompromisoHombre,
  'cat-anillos-compromiso-mujer.avif': catAnillosCompromisoMujer,
  'cat-anillos-mujer.avif': catAnillosMujer,
  'cat-anillos-hombre.avif': catAnillosHombre,
  'cat-pendientes.avif': catPendientes,
  'cat-gargantillas.avif': catGargantillas,
  'cat-cadenas.avif': catCadenas,
  'cat-dijes.avif': catDijes,
  'cat-pulseras.avif': catPulseras,
  'cat-sets.avif': catSets
}

export const CATEGORIES: Category[] = CATEGORY_DEFS.map(({ title, description, order, image }) => ({
  title,
  description,
  order,
  img: CATEGORY_IMAGES[image]
}))

export const categories = CATEGORIES.map((cat) => cat.title)

export { HIDDEN_CATEGORY, slugify }

export const unslugify = (slug: string): string => {
  const normalizedSlug = slug.toLowerCase().trim()

  const category = CATEGORIES.find((cat) => {
    const catSlug = slugify(cat.title)
    return catSlug === normalizedSlug
  })

  return category?.title || ''
}

export function findCategory(nameOrSlug: string): Category | undefined {
  const raw = nameOrSlug.toLowerCase().trim()
  if (!raw) return undefined

  return (
    CATEGORIES.find((cat) => cat.title.toLowerCase().trim() === raw) ??
    CATEGORIES.find((cat) => slugify(cat.title) === slugify(raw))
  )
}
