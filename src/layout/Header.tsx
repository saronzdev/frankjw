import { useState, useEffect } from 'preact/hooks'
import { Link, useLocation } from 'wouter'
import { Menu, LogOut } from 'lucide-preact'
import { NAV_ITEMS, DASHBOARD } from '@/data/navigation'
import { isAdmin, logout } from '@/shared/signals'
import { cx } from '@/ui/cx'
import { IconButton } from '@/ui/IconButton'
import { ProductMenu } from './ProductMenu'
import { MobileSidebar } from './MobileSidebar'
import logoMark from '@/assets/logo-mark.webp'

function isActive(location: string, href: string): boolean {
  if (href === '/') return location === '/'
  if (href === '/products') return location === '/products' || location.startsWith('/products/')
  return location.startsWith(href)
}

export function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [location] = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLogout = async () => {
    await logout()
    window.location.href = '/'
  }

  return (
    <header
      data-scrolled={scrolled}
      class={cx(
        'sticky top-0 z-40 border-b border-line/70 bg-bg/90 backdrop-blur-md data-[scrolled=true]:shadow-sm',
        'transition-[box-shadow] duration-300'
      )}
    >
      <div class="relative mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4">
        <div class="flex items-center gap-1">
          <IconButton label="Abrir menú" class="lg:hidden" size="sm" onClick={() => setSidebarOpen(true)}>
            <Menu size={20} />
          </IconButton>

          <Link to="/" class="hidden items-center gap-2.5 lg:flex" aria-label="Frank Joyería — Inicio">
            <img src={logoMark} alt="" class="h-10 w-auto" width={38} height={40} />
            <span class="font-display text-2xl font-semibold tracking-[0.06em] text-ink">
              Frank Joyería
            </span>
          </Link>
        </div>

        <Link
          to="/"
          class="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 lg:hidden"
          aria-label="Frank Joyería — Inicio"
        >
          <span class="font-display text-lg font-semibold tracking-[0.06em] text-ink">Frank Joyería</span>
          <img src={logoMark} alt="" class="h-5 w-auto" width={19} height={20} />
        </Link>

        <nav class="hidden items-center gap-1 lg:flex" aria-label="Navegación principal">
          {NAV_ITEMS.map((item) =>
            item.href === '/products' ? (
              <ProductMenu key={item.href} />
            ) : (
              <Link
                key={item.href}
                to={item.href}
                aria-current={isActive(location, item.href) ? 'page' : undefined}
                class={cx(
                  'relative rounded-md px-3.5 py-2 text-sm font-medium tracking-wide transition-colors',
                  isActive(location, item.href)
                    ? 'text-ink after:absolute after:inset-x-3 after:-bottom-px after:h-[2px] after:rounded-full after:bg-gold'
                    : 'text-ink-soft hover:text-ink'
                )}
              >
                {item.label}
              </Link>
            )
          )}

          {isAdmin.value && (
            <>
              <Link
                to={DASHBOARD.href}
                aria-current={isActive(location, DASHBOARD.href) ? 'page' : undefined}
                class={cx(
                  'relative rounded-md px-3 py-2 text-sm font-medium tracking-wide transition-colors',
                  isActive(location, DASHBOARD.href) ? 'text-ink' : 'text-ink-soft hover:text-ink'
                )}
              >
                {DASHBOARD.label}
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                class="flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium tracking-wide text-danger transition-colors hover:bg-red-50"
                aria-label="Cerrar sesión"
              >
                <LogOut size={15} aria-hidden="true" />
                Salir
              </button>
            </>
          )}
        </nav>
      </div>

      <MobileSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </header>
  )
}
