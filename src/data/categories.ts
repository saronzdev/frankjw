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

export const HIDDEN_CATEGORY = 'Componentes de Conjunto'

export const CATEGORIES: Category[] = [
  {
    title: 'Anillos de compromiso para hombre',
    description:
      'El compromiso también tiene su expresión masculina. Nuestros anillos de compromiso para hombre representan firmeza, lealtad y un estilo que perdura en el tiempo.',
    img: catAnillosCompromisoHombre,
    order: 1
  },
  {
    title: 'Anillos de compromiso para mujer',
    description:
      'La promesa de un amor eterno merece una joya inolvidable. Cada anillo de compromiso para mujer captura la esencia de la unión, con diseños que simbolizan pureza y elegancia.',
    img: catAnillosCompromisoMujer,
    order: 2
  },
  {
    title: 'Anillos para mujer',
    description:
      'Un símbolo de feminidad y sofisticación. Los anillos para mujer destacan por su delicadeza y brillo, creados para resaltar la belleza única de quien los lleva.',
    img: catAnillosMujer,
    order: 3
  },
  {
    title: 'Anillos para hombre',
    description:
      'Diseñados para reflejar fuerza y estilo, nuestros anillos para hombre combinan elegancia contemporánea con detalles atemporales. Piezas que transmiten carácter y distinción en cada ocasión.',
    img: catAnillosHombre,
    order: 4
  },
  {
    title: 'Argollas y aretes',
    description:
      'Versátiles y atemporales, nuestras argollas y aretes son el detalle que transforma cualquier estilo. Diseños que van desde la sencillez delicada hasta el brillo deslumbrante.',
    img: catPendientes,
    order: 5
  },
  {
    title: 'Gargantillas',
    description:
      'Piezas que enmarcan el cuello con sutileza y distinción. Las gargantillas realzan la elegancia natural y son el complemento perfecto para cualquier look, desde lo cotidiano hasta lo más especial.',
    img: catGargantillas,
    order: 6
  },
  {
    title: 'Cadenas',
    description:
      'Un clásico imprescindible. Las cadenas son el punto de partida para crear combinaciones únicas o lucir solas con un encanto propio. Elegancia pura en cada eslabón.',
    img: catCadenas,
    order: 7
  },
  {
    title: 'Dijes',
    description:
      'Pequeños símbolos con gran significado. Los dijes permiten personalizar tu estilo y llevar contigo recuerdos, creencias o emociones en una joya única.',
    img: catDijes,
    order: 8
  },
  {
    title: 'Pulseras y tobilleras',
    description:
      'Diseños que rodean la muñeca con estilo y distinción. Nuestras pulseras y tobilleras unen delicadeza, brillo y personalidad, convirtiéndose en el detalle ideal para expresar quién eres.',
    img: catPulseras,
    order: 9
  },
  {
    title: 'Conjuntos de joyas',
    description:
      'Conjuntos que reúnen tus piezas favoritas: desde un dúo de collar y pendientes hasta un set completo de anillos. Un look equilibrado y completo sin esfuerzo, pensado para elevar tu estilo diario.',
    img: catSets,
    order: 10
  },
  {
    title: HIDDEN_CATEGORY,
    description: 'Productos individuales que forman parte de conjuntos.',
    img: catSets,
    order: 999
  }
]

export const categories = CATEGORIES.map((cat) => cat.title)

export const slugify = (string: string): string => {
  return string
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '')
}

export const unslugify = (slug: string): string => {
  const normalizedSlug = slug.toLowerCase().trim()

  const category = CATEGORIES.find((cat) => {
    const catSlug = slugify(cat.title)
    return catSlug === normalizedSlug
  })

  return category?.title || ''
}

/** Resuelve una categoría a partir de su título o slug (matching histórico flexible). */
export function findCategory(nameOrSlug: string): Category | undefined {
  const raw = nameOrSlug.toLowerCase().trim()
  if (!raw) return undefined

  return (
    CATEGORIES.find((cat) => cat.title.toLowerCase().trim() === raw) ??
    CATEGORIES.find((cat) => slugify(cat.title) === slugify(raw))
  )
}
