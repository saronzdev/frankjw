import { slugify } from './slug'

export interface CategoryDef {
  title: string
  description: string
  order: number
  image: string
}

export const HIDDEN_CATEGORY = 'Componentes de Conjunto'

export const CATEGORY_DEFS: CategoryDef[] = [
  {
    title: 'Anillos de compromiso para hombre',
    description:
      'El compromiso también tiene su expresión masculina. Nuestros anillos de compromiso para hombre representan firmeza, lealtad y un estilo que perdura en el tiempo.',
    image: 'cat-anillos-compromiso-hombre.avif',
    order: 1
  },
  {
    title: 'Anillos de compromiso para mujer',
    description:
      'La promesa de un amor eterno merece una joya inolvidable. Cada anillo de compromiso para mujer captura la esencia de la unión, con diseños que simbolizan pureza y elegancia.',
    image: 'cat-anillos-compromiso-mujer.avif',
    order: 2
  },
  {
    title: 'Anillos para mujer',
    description:
      'Un símbolo de feminidad y sofisticación. Los anillos para mujer destacan por su delicadeza y brillo, creados para resaltar la belleza única de quien los lleva.',
    image: 'cat-anillos-mujer.avif',
    order: 3
  },
  {
    title: 'Anillos para hombre',
    description:
      'Diseñados para reflejar fuerza y estilo, nuestros anillos para hombre combinan elegancia contemporánea con detalles atemporales. Piezas que transmiten carácter y distinción en cada ocasión.',
    image: 'cat-anillos-hombre.avif',
    order: 4
  },
  {
    title: 'Argollas y aretes',
    description:
      'Versátiles y atemporales, nuestras argollas y aretes son el detalle que transforma cualquier estilo. Diseños que van desde la sencillez delicada hasta el brillo deslumbrante.',
    image: 'cat-pendientes.avif',
    order: 5
  },
  {
    title: 'Gargantillas',
    description:
      'Piezas que enmarcan el cuello con sutileza y distinción. Las gargantillas realzan la elegancia natural y son el complemento perfecto para cualquier look, desde lo cotidiano hasta lo más especial.',
    image: 'cat-gargantillas.avif',
    order: 6
  },
  {
    title: 'Cadenas',
    description:
      'Un clásico imprescindible. Las cadenas son el punto de partida para crear combinaciones únicas o lucir solas con un encanto propio. Elegancia pura en cada eslabón.',
    image: 'cat-cadenas.avif',
    order: 7
  },
  {
    title: 'Dijes',
    description:
      'Pequeños símbolos con gran significado. Los dijes permiten personalizar tu estilo y llevar contigo recuerdos, creencias o emociones en una joya única.',
    image: 'cat-dijes.avif',
    order: 8
  },
  {
    title: 'Pulseras y tobilleras',
    description:
      'Diseños que rodean la muñeca con estilo y distinción. Nuestras pulseras y tobilleras unen delicadeza, brillo y personalidad, convirtiéndose en el detalle ideal para expresar quién eres.',
    image: 'cat-pulseras.avif',
    order: 9
  },
  {
    title: 'Conjuntos de joyas',
    description:
      'Conjuntos que reúnen tus piezas favoritas: desde un dúo de collar y pendientes hasta un set completo de anillos. Un look equilibrado y completo sin esfuerzo, pensado para elevar tu estilo diario.',
    image: 'cat-sets.avif',
    order: 10
  },
  {
    title: HIDDEN_CATEGORY,
    description: 'Productos individuales que forman parte de conjuntos.',
    image: 'cat-sets.avif',
    order: 999
  }
]

export function findCategoryDef(nameOrSlug: string): CategoryDef | undefined {
  const raw = nameOrSlug.toLowerCase().trim()
  if (!raw) return undefined

  return (
    CATEGORY_DEFS.find((cat) => cat.title.toLowerCase().trim() === raw) ??
    CATEGORY_DEFS.find((cat) => slugify(cat.title) === slugify(raw))
  )
}
