export type NavItem = {
  label: string
  href: string
}

/** Primary navigation entries shared by header and mobile sidebar. */
export const NAV_ITEMS: NavItem[] = [
  { label: 'Inicio', href: '/' },
  { label: 'Productos', href: '/products' },
  { label: 'Nosotros', href: '/about' },
  { label: 'Contacto', href: '/contact' }
]

export const DASHBOARD: NavItem = { label: 'Dashboard', href: '/dashboard' }
