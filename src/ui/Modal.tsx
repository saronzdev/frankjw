import { type ComponentChildren } from 'preact'
import { createPortal } from 'preact/compat'
import { useRef } from 'preact/hooks'
import { X } from 'lucide-preact'
import { cx } from './cx'
import { useOverlayBehavior } from './useOverlayBehavior'
import { IconButton } from './IconButton'

type Size = 'sm' | 'md' | 'lg'

type ModalProps = {
  open: boolean
  onClose: () => void
  title?: string
  size?: Size
  /** Renders the panel with a tall fixed height suitable for image galleries. */
  tall?: boolean
  padded?: boolean
  children?: ComponentChildren
}

const sizes: Record<Size, string> = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-2xl'
}

export function Modal({ open, onClose, title, size = 'md', tall, padded = true, children }: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null)

  useOverlayBehavior({ open, onClose, panelRef })

  if (!open) return null

  return createPortal(
    <div
      class="fixed inset-0 z-50 overflow-y-auto bg-black/55 backdrop-blur-[2px] animate-overlay-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div class="grid min-h-full place-items-center p-4">
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label={title}
          tabIndex={-1}
          class={cx(
            'relative flex w-full flex-col overflow-hidden rounded-lg bg-surface shadow-2xl animate-panel-in',
            'outline-none focus-visible:outline-none',
            tall ? 'h-[min(88dvh,760px)]' : 'max-h-[calc(100dvh-4rem)]',
            sizes[size]
          )}
        >
          {title && (
            <header class="flex items-center justify-between border-b border-line px-5 py-4">
              <h2 class="font-display text-lg font-semibold text-ink">{title}</h2>
              <IconButton label="Cerrar" size="sm" onClick={onClose}>
                <X size={18} aria-hidden="true" />
              </IconButton>
            </header>
          )}
          <div class={cx('min-h-0 flex-1 overflow-y-auto', padded && 'p-5')}>{children}</div>
        </div>
      </div>
    </div>,
    document.body
  )
}
