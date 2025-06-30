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
