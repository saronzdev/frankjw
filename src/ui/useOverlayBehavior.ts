import { useEffect } from 'preact/hooks'
import { type RefObject } from 'preact'
import { trapTabKey } from './focus'

interface OverlayBehaviorOptions {
  open: boolean
  onClose: () => void
  /** Element rendered inside the overlay that keeps focus trapped. */
  panelRef?: RefObject<HTMLElement | null>
}

/** Escape-to-close, focus trap and body scroll lock for Modal/Drawer overlays. */
export function useOverlayBehavior({ open, onClose, panelRef }: OverlayBehaviorOptions): void {
  useEffect(() => {
    if (!open) return

    const previouslyFocused = document.activeElement as HTMLElement | null
    const { body } = document
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    const restore = () => {
      body.style.overflow = ''
      body.style.paddingRight = ''
      previouslyFocused?.focus()
    }

    body.style.overflow = 'hidden'
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`
    }

    panelRef?.current?.focus()

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation()
        onClose()
        return
      }
      if (panelRef?.current) trapTabKey(event, panelRef.current)
    }

    document.addEventListener('keydown', handleKeydown)

    return () => {
      document.removeEventListener('keydown', handleKeydown)
      restore()
    }
  }, [open, onClose])
}
