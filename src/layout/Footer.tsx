import { Link } from 'wouter'
import { ArrowRight, ArrowUpRight } from 'lucide-preact'
import { NAV_ITEMS } from '@/data/navigation'
import { socialLinks } from '@/shared/constants'
import logoMark from '@/assets/logo-mark.webp'

/** Global footer shared by every page. */
export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer class="border-t border-line bg-surface">
      <div class="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link to="/" class="inline-flex items-center gap-2.5" aria-label="Frank Joyería — Inicio">
            <img src={logoMark} alt="" class="h-9 w-auto" width={34} height={36} />
            <span class="font-display text-lg font-semibold tracking-[0.06em] text-ink">Frank Joyería</span>
          </Link>
          <p class="mt-3 max-w-64 text-sm leading-relaxed text-ink-muted">
            Joyería artesanal de alta calidad. Diseño, elaboración y comercialización en Cuba.
          </p>
          <div class="mt-4 flex items-center gap-1">
            {socialLinks.map(({ icon, name, href }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                title={name}
                class="flex h-9 w-9 items-center justify-center rounded-md text-ink-soft transition-colors hover:bg-surface-2 hover:text-ink"
              >
                <img src={icon} alt="" class="h-[18px] w-[18px]" loading="lazy" />
              </a>
            ))}
          </div>
        </div>

        <nav aria-label="Explorar">
          <h3 class="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">Explorar</h3>
          <ul class="mt-4 space-y-2.5">
            {NAV_ITEMS.map(({ label, href }) => (
              <li key={href}>
                <Link
                  to={href}
                  class="group inline-flex items-center gap-1.5 text-sm text-ink-soft transition-colors hover:text-ink hover:underline hover:underline-offset-4"
                >
                  {label}
                  <ArrowRight
                    size={13}
                    strokeWidth={2}
                    aria-hidden="true"
                    class="text-ink-muted transition-[transform,color] duration-200 group-hover:translate-x-0.5 group-hover:text-gold-deep"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 class="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">Contacto</h3>
          <ul class="mt-4 space-y-2.5 text-sm text-ink-soft">
            <li>
              <a
                href="tel:+5353444690"
                class="group inline-flex items-center gap-1.5 transition-colors hover:text-ink"
              >
                +5353444690
                <ArrowUpRight
                  size={13}
                  strokeWidth={2}
                  aria-hidden="true"
                  class="text-ink-muted transition-[transform,color] duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold-deep"
                />
              </a>
            </li>
            <li>
              <a
                href="mailto:frankjoyeriacuba@gmail.com"
                class="group inline-flex items-center gap-1.5 break-all transition-colors hover:text-ink"
              >
                frankjoyeriacuba@gmail.com
                <ArrowUpRight
                  size={13}
                  strokeWidth={2}
                  aria-hidden="true"
                  class="shrink-0 text-ink-muted transition-[transform,color] duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold-deep"
                />
              </a>
            </li>
            <li class="text-ink-muted">
              Calle Medio entre 2 de Mayo y América
              <br />
              Matanzas, Cuba
            </li>
            <li class="text-ink-muted">
              Calle San Benigno #169 entre Vía Blanca y Serafines
              <br />
              Cerro, Habana, Cuba
            </li>
          </ul>
        </div>

        <div>
          <h3 class="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">Horarios</h3>
          <ul class="mt-4 space-y-2.5 text-sm text-ink-soft">
            <li class="flex justify-between gap-4">
              <span>Lunes – Sábado</span>
              <span class="text-ink">9:00 AM – 4:00 PM</span>
            </li>
            <li class="flex justify-between gap-4">
              <span>Domingos</span>
              <span class="text-ink-muted">Cerrado</span>
            </li>
            <li class="flex justify-between gap-4">
              <span>WhatsApp</span>
              <span class="text-ink">24/7</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="border-t border-line">
        <div class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-ink-muted sm:flex-row">
          <p>© {year} Frank Joyería. Todos los derechos reservados.</p>
          <p>
            Diseño con ♥ por{' '}
            <a
              href="https://saronzdev.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              class="group inline-flex items-center gap-1 underline-offset-4 transition-colors hover:text-ink hover:underline"
            >
              saronzdev
              <ArrowUpRight
                size={11}
                strokeWidth={2}
                aria-hidden="true"
                class="text-ink-muted transition-[transform,color] duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold-deep"
              />
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
