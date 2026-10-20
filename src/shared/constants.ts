import type { Seller } from '@/types'
import sample1 from '@/assets/sample1.webp'
import sample2 from '@/assets/sample2.webp'
import sample3 from '@/assets/sample3.webp'
import fb from '@/assets/fb.svg'
import ws from '@/assets/ws.svg'
import ig from '@/assets/ig.svg'
import mail from '@/assets/mail.svg'

export const commonKarats = [8, 10, 14, 18, 22]

export const SELLERS: Seller[] = [
  {
    name: 'Zenia Pérez',
    number: 5356469531,
    location: 'Calle Medio/ Dos de Mayo & América, Matanzas, Cuba'
  },
  {
    name: 'Ariel Rivero',
    number: 5352501232,
    location: 'Calle San Benigno/ Serafines y Vía Blanca, La Habana, Cuba'
  },
  {
    name: 'Frank Joyería',
    number: 5353444690,
    location: 'Frank Joyería'
  }
]

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
