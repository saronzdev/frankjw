import { type JSX } from 'preact'
import { useRef } from 'preact/hooks'
import { Link, useLocation } from 'wouter'
import { House, ShoppingBag, Info, Phone, LayoutDashboard, LogOut, ChevronRight, X } from 'lucide-preact'
import { NAV_ITEMS, DASHBOARD, type NavItem } from '@/data/navigation'
import { cats, isAdmin, logout } from '@/shared/signals'
import { normalize, slugify } from '@/shared/utils'
import { useOverlayBehavior } from '@/ui/useOverlayBehavior'
import { cx } from '@/ui/cx'
import { IconButton } from '@/ui/IconButton'

interface Props {
  open: boolean
  onClose: () => void
}

const ICONS: Record<string, JSX.Element> = {
  '/': <House size={18} aria-hidden="true" />,
  '/products': <ShoppingBag size={18} aria-hidden="true" />,
  '/about': <Info size={18} aria-hidden="true" />,
  '/contact': <Phone size={18} aria-hidden="true" />,
  '/dashboard': <LayoutDashboard size={18} aria-hidden="true" />
}

function isActive(location: string, href: string): boolean {
  if (href === '/') return location === '/'
  if (href === '/products') return location === '/products' || location.startsWith('/products/')
  return location.startsWith(href)
}

export function MobileSidebar({ open, onClose }: Props) {
  const panelRef = useRef<HTMLDivElement>(null)
  const [location] = useLocation()

  useOverlayBehavior({ open, onClose, panelRef })

  if (!open) return null

  const handleLogout = async () => {
    await logout()
    onClose()
    window.location.href = '/'
  }

  return (
    <>
      <div class="fixed inset-0 z-50 bg-black/50 animate-overlay-in" onClick={onClose} />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
        tabIndex={-1}
        class="fixed left-0 top-0 z-50 flex h-dvh w-[19rem] max-w-[88vw] flex-col bg-surface shadow-2xl outline-none animate-drawer-left focus-visible:outline-none"
      >
        <header class="flex items-center justify-between border-b border-line px-4 py-3">
          <span class="font-display text-base font-semibold tracking-[0.06em] text-ink">Frank Joyería</span>
          <IconButton label="Cerrar menú" size="sm" onClick={onClose}>
            <X size={18} aria-hidden="true" />
          </IconButton>
        </header>

        <nav class="min-h-0 flex-1 overflow-y-auto p-3" aria-label="Navegación del menú">
          <ul class="space-y-1">
            {NAV_ITEMS.map((item) => (
              <NavItemLi key={item.href} item={item} location={location} onNavigate={onClose} />
            ))}
            {isAdmin.value && <NavItemLi item={DASHBOARD} location={location} onNavigate={onClose} />}
          </ul>

          {cats.value.length > 0 && (
            <>
              <p class="mt-4 px-3 pb-2 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-ink-muted">
                Categorías
              </p>
              <ul class="space-y-0.5">
                {cats.value.map((category) => (
                  <li key={category}>
                    <Link
                      to={`/products/${slugify(category)}`}
                      onClick={onClose}
                      class={cx(
                        'flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                        'hover:bg-surface-2',
                        isActive(location, `/products/${slugify(category)}`)
                          ? 'bg-gold-soft/60 text-ink'
                          : 'text-ink hover:text-ink'
                      )}
                    >
                      {normalize(category)}
                      <ChevronRight size={14} class="ml-auto text-ink-muted" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </nav>

        <footer class="border-t border-line p-3">
          {isAdmin.value && (
            <button
              type="button"
              onClick={handleLogout}
              class="flex w-full items-center gap-2 rounded-md border border-danger/30 px-3 py-2.5 text-sm font-medium text-danger transition-colors hover:bg-red-50"
              aria-label="Cerrar sesión"
            >
              <LogOut size={16} aria-hidden="true" />
              Cerrar sesión
            </button>
          )}
          <p class="mt-2 text-center text-xs text-ink-muted">
            © {new Date().getFullYear()} Frank Joyería
          </p>
        </footer>
      </div>
    </>
  )
}

function NavItemLi({ item, location, onNavigate }: { item: NavItem; location: string; onNavigate: () => void }) {
  const active = isActive(location, item.href)
  return (
    <li>
      <Link
        to={item.href}
        onClick={onNavigate}
        aria-current={active ? 'page' : undefined}
        class={cx(
          'flex items-center gap-3 rounded-md px-3 py-2.5 text-[0.95rem] font-medium transition-colors hover:bg-surface-2',
          active ? 'bg-gold-soft/60 text-ink' : 'text-ink-soft hover:text-ink'
        )}
      >
        {ICONS[item.href]}
        {item.label}
      </Link>
    </li>
  )
}
