export const SITE_URL = 'https://frankjoyeriacuba.com'

export const SITE_NAME = 'Frank Joyería'

export const DEFAULT_TITLE = 'Frank Joyería | Joyas de oro en Cuba'

export const DEFAULT_DESCRIPTION =
  'Frank Joyería: joyas de alta calidad, anillos, cadenas, aretes y más. Compra online en Cuba. Artesanía, elegancia y los mejores precios.'

export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`

export const DEFAULT_OG_IMAGE_WIDTH = '1200'

export const DEFAULT_OG_IMAGE_HEIGHT = '630'

export const DEFAULT_OG_IMAGE_ALT = 'Colección de joyas de oro de Frank Joyería'

export const PRODUCTS_TITLE = 'Catálogo de joyas | Frank Joyería'

export const PRODUCTS_DESCRIPTION =
  'Explora nuestro catálogo: anillos, cadenas, aretes, pulseras y más joyas de oro con diseños únicos y precios justos.'

export const ABOUT_TITLE = 'Nuestra Historia | Frank Joyería'

export const ABOUT_DESCRIPTION =
  'Frank Joyería: mediana empresa manufacturera especializada en el diseño, elaboración y comercialización de joyas de alta calidad en Cuba.'

export const CONTACT_TITLE = 'Contacto | Frank Joyería'

export const CONTACT_DESCRIPTION =
  'Visítanos en Matanzas o Habana, llámanos al +5353444690, escríbenos por WhatsApp o email. Conoce nuestros horarios de atención.'

export function canonicalUrl(path: string): string {
  const [route] = path.split('?')
  const normalized = route && route !== '/' ? `/${route.split('/').filter(Boolean).join('/')}` : '/'
  return SITE_URL + normalized
}

export function absoluteUrl(value: string): string {
  if (/^https?:\/\//i.test(value)) return value
  return `${SITE_URL}${value.startsWith('/') ? '' : '/'}${value}`
}
