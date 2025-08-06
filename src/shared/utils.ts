import axios from 'axios'
import Home from '@/assets/home.svg'
import Products from '@/assets/products.svg'
import About from '@/assets/about.svg'
import Contact from '@/assets/contact.svg'
import Dashboard from '@/assets/dashboard.svg'
import { increaseSales } from './fetching'
import type { ProductType } from '../types'
import sample1 from '@/assets/sample1.webp'
import sample2 from '@/assets/sample2.webp'
import sample3 from '@/assets/sample3.webp'
import fb from '@/assets/fb.svg'
import ws from '@/assets/ws.svg'
import ig from '@/assets/ig.svg'
import mail from '@/assets/mail.svg'

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

export const categories = [
  'Anillo de hombre',
  'Anillo de mujer',
  'Anillo de compromiso mujer',
  'Anillo de compromiso hombre',
  'Gargantillas',
  'Aretes y argollas',
  'Cadenas',
  'Dijes',
  'Manillas'
]

export const handleReservation = async (product: Omit<ProductType, 'pictures'>) => {
  await increaseSales(product.id)
  const message = `Hola! Me interesa reservar: ${product.description} - ID: ${product.productId}`
  const whatsappUrl = `https://wa.me/5353444690?text=${encodeURIComponent(message)}`
  window.open(whatsappUrl, '_blank')
}

const url = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'
export const API_URL = url + '/api/v1/'

export const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  },
  withCredentials: true
})

export const normalize = (string: string) => string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()

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

export const isValidEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

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
