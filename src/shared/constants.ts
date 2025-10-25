import Home from '@/assets/home.svg'
import Products from '@/assets/products.svg'
import About from '@/assets/about.svg'
import Contact from '@/assets/contact.svg'
import Dashboard from '@/assets/dashboard.svg'
import sample1 from '@/assets/sample1.webp'
import sample2 from '@/assets/sample2.webp'
import sample3 from '@/assets/sample3.webp'
import fb from '@/assets/fb.svg'
import ws from '@/assets/ws.svg'
import ig from '@/assets/ig.svg'
import mail from '@/assets/mail.svg'
import dijes from '@/assets/dijes.avif'
import pulseras from '@/assets/pulseras.avif'
import cadenas from '@/assets/cadenas.avif'
import pendientes from '@/assets/pendientes.avif'
import gargantillas from '@/assets/gargantillas.avif'
import anillosm from '@/assets/anillosm.avif'
import anillosh from '@/assets/anillosh.avif'
import anilloscm from '@/assets/anilloscm.avif'
import anillosch from '@/assets/anillosch.avif'

export const socialLinks = [
  {
    icon: fb,
    name: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=100093441805320'
  },
  {
    icon: ws,
    name: 'WhatsApp',
    href: 'https://api.whatsapp.com/send?phone=5353444690'
  },
  {
    icon: ig,
    name: 'Instagram',
    href: 'https://instagram.com/frank_joyeria_cuba'
  },
  {
    icon: mail,
    name: 'Email',
    href: 'mailto:frankjoyeriacuba@gmail.com'
  }
]

export const highlights = [
  {
    src: sample1,
    text: 'Brilla con luz propia'
  },
  {
    src: sample2,
    text: 'Cada joya cuenta una historia'
  },
  {
    src: sample3,
    text: 'Elegancia en todo momento'
  }
]

export const CATEGORIES = [
  {
    title: 'Anillos para hombre',
    description:
      'Diseñados para reflejar fuerza y estilo, nuestros anillos para hombre combinan elegancia contemporánea con detalles atemporales. Piezas que transmiten carácter y distinción en cada ocasión.',
    img: anillosh
  },
  {
    title: 'Anillos para mujer',
    description:
      'Un símbolo de feminidad y sofisticación. Los anillos para mujer destacan por su delicadeza y brillo, creados para resaltar la belleza única de quien los lleva.',
    img: anillosm
  },
  {
    title: 'Anillos de compromiso para hombre',
    description:
      'El compromiso también tiene su expresión masculina. Nuestros anillos de compromiso para hombre representan firmeza, lealtad y un estilo que perdura en el tiempo.',
    img: anillosch
  },
  {
    title: 'Anillos de compromiso para mujer',
    description:
      'La promesa de un amor eterno merece una joya inolvidable. Cada anillo de compromiso para mujer captura la esencia de la unión, con diseños que simbolizan pureza y elegancia.',
    img: anilloscm
  },
  {
    title: 'Gargantillas',
    description:
      'Piezas que enmarcan el cuello con sutileza y distinción. Las gargantillas realzan la elegancia natural y son el complemento perfecto para cualquier look, desde lo cotidiano hasta lo más especial.',
    img: gargantillas
  },
  {
    title: 'Pendientes y argollas',
    description:
      'Versátiles y atemporales, nuestros pendientes y argollas son el detalle que transforma cualquier estilo. Diseños que van desde la sencillez delicada hasta el brillo deslumbrante.',
    img: pendientes
  },
  {
    title: 'Cadenas',
    description:
      'Un clásico imprescindible. Las cadenas son el punto de partida para crear combinaciones únicas o lucir solas con un encanto propio. Elegancia pura en cada eslabón.',
    img: cadenas
  },
  {
    title: 'Dijes',
    description:
      'Pequeños símbolos con gran significado. Los dijes permiten personalizar tu estilo y llevar contigo recuerdos, creencias o emociones en una joya única.',
    img: dijes
  },
  {
    title: 'Pulseras y tobilleras',
    description:
      'Diseños que rodean la muñeca con estilo y distinción. Nuestras pulseras y tobilleras unen delicadeza, brillo y personalidad, convirtiéndose en el detalle ideal para expresar quién eres.',
    img: pulseras
  }
]

export const categories = CATEGORIES.map((cat) => cat.title)

export const menuItems = [
  { label: 'Inicio', href: '/' },
  { label: 'Productos', href: '/products' },
  { label: 'Nosotros', href: '/about' },
  { label: 'Contacto', href: '/contact' },
  { label: 'Dashboard', href: '/dashboard' }
]

export const menuItemsMobile = [
  { label: 'Inicio', href: '/', icon: Home },
  { label: 'Productos', href: '/products', icon: Products },
  { label: 'Nosotros', href: '/about', icon: About },
  { label: 'Contacto', href: '/contact', icon: Contact },
  { label: 'Dashboard', href: '/dashboard', icon: Dashboard }
]

export const titles = {
  '/': 'Frank Joyería',
  '/products': 'Productos',
  '/about': 'Nuestra Historia',
  '/contact': 'Contacto',
  '/dashboard': 'Dashboard',
  '/404': 'Página no encontrada',
  '/login': 'Iniciar sesión'
}

export const MAX_RETRIES = 3
export const INITIAL_BACKOFF_MS = 500

export function getErrorMessage(code: number): string {
  switch (code) {
    // General Errors
    case 1:
      return 'Ha ocurrido un error inesperado. Intenta de nuevo.'
    case 1000:
      return 'No se pudo conectar al servidor. Verifica tu conexión a internet.'

    // Auth Errors
    case 1001:
      return 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.'
    case 1002:
      return 'Credenciales inválidas. Verifica tu correo y contraseña.'
    case 1003:
      return 'Acceso denegado. No tienes permisos para realizar esta acción.'
    case 1004:
      return 'Usuario no encontrado. Verifica tu correo electrónico.'
    case 1005:
      return 'Contraseña incorrecta. Intenta nuevamente.'
    case 1006:
      return 'Error de autenticación. Intenta de nuevo más tarde.'

    // Products Errors
    case 1101:
      return 'Producto no encontrado.'
    case 1102:
      return 'Ya existe un producto con este ID.'
    case 1103:
      return 'El ID del producto no es válido.'

    // Validations Errors
    case 2001:
      return 'El correo electrónico ingresado no es válido.'
    case 2002:
      return 'Faltan campos obligatorios. Completa todos los datos requeridos.'
    case 2003:
      return 'Ya existe un registro con estos datos.'
    case 2004:
      return 'El ID proporcionado no es válido.'

    // Server Errors
    case 3001:
      return 'Error interno del servidor. Intenta de nuevo más tarde.'
    case 3002:
      return 'Error al subir el archivo. Intenta nuevamente.'

    default:
      return 'Ha ocurrido un error inesperado. Intenta de nuevo.'
  }
}
