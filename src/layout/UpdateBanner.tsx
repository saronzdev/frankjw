import { useState } from 'preact/hooks'
import { ChevronRight, Sparkles, X } from 'lucide-preact'
import { Modal } from '@/ui/Modal'

const BANNER_KEY = 'ui-v2-banner-dismissed'

interface Change {
  heading: string
  detail: string
}

const CHANGES: Change[] = [
  {
    heading: 'Nueva identidad visual',
    detail: 'Tipografía serif para los títulos y una paleta sobria con detalles dorados.'
  },
  {
    heading: 'Navegación renovada',
    detail: 'Barra superior unificada y un menú móvil más claro, con acceso directo a cada categoría.'
  },
  {
    heading: 'Catálogo mejorado',
    detail: 'Filtros ordenados en un panel deslizable y búsqueda por referencia, con tarjetas más limpias.'
  },
  {
    heading: 'Ventanas de producto y reserva rediseñadas',
    detail: 'Más protagonismo a la pieza y menos pasos para solicitarla.'
  },
  {
    heading: 'Encabezados por categoría',
    detail: 'Cada colección abre con un banner descriptivo y una breve introducción.'
  },
  {
    heading: 'Galería accesible',
    detail: 'Carrusel con controles visibles, navegación por teclado y pausa automática al pasar el cursor.'
  },
  {
    heading: 'Cargas más rápidas',
    detail: 'Imágenes optimizadas y adaptadas a cada pantalla en todo el sitio.'
  },
  {
    heading: 'Mejoras de accesibilidad',
    detail: 'Contraste, estados de foco y etiquetas para lectores de pantalla.'
  }
]

/** Barra breve bajo el encabezado que anuncia la nueva interfaz y abre el detalle de cambios. */
export function UpdateBanner() {
  const [dismissed, setDismissed] = useState(() => localStorage.getItem(BANNER_KEY) === 'true')
  const [open, setOpen] = useState(false)

  const dismiss = () => {
    localStorage.setItem(BANNER_KEY, 'true')
    setDismissed(true)
  }

  if (dismissed) return null

  return (
    <>
      <section
        aria-label="Novedades del sitio"
        class="border-b border-line/70 bg-gold-soft/40 px-4 py-2 text-xs sm:text-sm"
      >
        <div class="mx-auto flex max-w-7xl items-center justify-center gap-2">
          <Sparkles size={14} class="shrink-0 text-gold-deep" aria-hidden="true" />
          <span class="text-ink-soft">Hemos renovado nuestra web</span>
          <button
            type="button"
            onClick={() => setOpen(true)}
            class="inline-flex items-center gap-1 font-medium text-gold-deep underline decoration-gold/60 decoration-1 underline-offset-4 transition-colors hover:decoration-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            Ver cambios
            <ChevronRight size={13} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={dismiss}
            aria-label="No volver a mostrar este anuncio"
            class="-mr-2 rounded-md p-2 text-ink-muted transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            <X size={14} aria-hidden="true" />
          </button>
        </div>
      </section>

      <Modal open={open} onClose={() => setOpen(false)} title="Novedades de la versión 2" size="md">
        <p class="leading-relaxed text-ink-muted">
          Actualizamos el sitio para que sea más claro, rápido y fácil de recorrer. Esto es lo que cambió:
        </p>
        <ul class="mt-4 flex flex-col gap-3.5">
          {CHANGES.map((change) => (
            <li key={change.heading} class="flex gap-2.5">
              <span class="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold-soft/70 text-gold-deep">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" class="h-3 w-3" aria-hidden="true">
                  <path d="M4 12.5 9.5 18 20 6.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </span>
              <div>
                <p class="font-semibold tracking-wide text-ink">{change.heading}</p>
                <p class="mt-0.5 text-sm leading-relaxed text-ink-muted">{change.detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </Modal>
    </>
  )
}
