import { type ComponentChildren } from 'preact'
import { createPortal } from 'preact/compat'
import { useRef } from 'preact/hooks'
import { X } from 'lucide-preact'
import { useOverlayBehavior } from './useOverlayBehavior'
import { IconButton } from './IconButton'

type DrawerProps = {
  open: boolean
  onClose: () => void
  title?: string
  children?: ComponentChildren
}

export function Drawer({ open, onClose, title, children }: DrawerProps) {
  const panelRef = useRef<HTMLDivElement>(null)

  useOverlayBehavior({ open, onClose, panelRef })

  if (!open) return null

  return createPortal(
    <>
      <div class="fixed inset-0 z-50 bg-black/50 animate-overlay-in" onClick={onClose} />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        class="fixed right-0 top-0 z-50 flex h-dvh w-[22rem] max-w-[92vw] flex-col bg-surface shadow-2xl outline-none focus-visible:outline-none"
      >
        {title && (
          <header class="flex items-center justify-between border-b border-line px-5 py-4">
            <h2 class="font-display text-lg font-semibold text-ink">{title}</h2>
            <IconButton label="Cerrar" size="sm" onClick={onClose}>
              <X size={18} aria-hidden="true" />
            </IconButton>
          </header>
        )}
        <div class="min-h-0 flex-1 overflow-y-auto p-5">{children}</div>
      </div>
    </>,
    document.body
  )
}
