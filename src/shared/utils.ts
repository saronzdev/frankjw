export const capitalize = (string: string) => string.charAt(0).toUpperCase() + string.slice(1)
export const menuItems = [
  { label: 'Inicio', href: '/' },
  { label: 'Productos', href: '/products' },
  { label: 'Nosotros', href: '/about' },
  { label: 'Contacto', href: '/contact' }
]
export const isValidEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

export const getAuth = () => {
  const auth = localStorage.getItem('auth')
  if (auth) return JSON.parse(auth)
  return null
}

// Puedes poner esto en utils/errors.ts del frontend

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
