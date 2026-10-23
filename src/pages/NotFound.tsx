import { useEffect } from 'preact/hooks'
import { Link } from 'wouter'
import { Button } from '@/ui/Button'
import { cx } from '@/ui/cx'
import { usePageMeta } from '@/shared/meta'

export function NotFound() {
  useEffect(() => {
    window.history.replaceState(null, '', '/404')
  }, [])

  usePageMeta({ title: 'Página no encontrada | Frank Joyería', path: '/404', noIndex: true })

  const links = [
    { href: '/about', label: 'Nosotros' },
    { href: '/products', label: 'Productos' },
    { href: '/contact', label: 'Contacto' }
  ]

  return (
    <div class="mx-auto flex max-w-md flex-col items-center gap-5 px-4 py-24 text-center">
      <p class="font-display text-8xl font-semibold leading-none tracking-[0.05em] text-gold/40">404</p>
      <div class="flex flex-col gap-2">
        <h1 class="font-display text-2xl font-semibold text-ink">Página no encontrada</h1>
        <p class="leading-relaxed text-ink-muted">
          Lo sentimos, la página que buscas no existe o ha sido movida a otra ubicación.
        </p>
      </div>

      <Link to="/" aria-label="Volver al inicio">
        <Button>Volver al inicio</Button>
      </Link>

      <div class="flex flex-col gap-2 pt-2">
        <p class="text-xs font-medium uppercase tracking-[0.14em] text-ink-muted">¿Buscabas alguna de estas páginas?</p>
        <nav class="flex justify-center gap-5" aria-label="Enlaces sugeridos">
          {links.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              class={cx('text-sm text-ink-soft underline-offset-4 transition-colors', 'hover:text-gold-deep hover:underline')}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}
