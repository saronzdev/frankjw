import { useEffect } from 'preact/hooks'
import { type RefObject } from 'preact'
import { trapTabKey } from './focus'

interface OverlayBehaviorOptions {
  open: boolean
  onClose: () => void
  /** Element rendered inside the overlay that keeps focus trapped. */
  panelRef?: RefObject<HTMLElement | null>
}

/** Tracks nested overlays so Escape closes only the topmost one. */
const openStack: symbol[] = []
let lockCount = 0

/** Escape-to-close, focus trap and body scroll lock for Modal/Drawer overlays. */
export function useOverlayBehavior({ open, onClose, panelRef }: OverlayBehaviorOptions): void {
  useEffect(() => {
    if (!open) return

    const id = Symbol()
    openStack.push(id)
    lockCount++

    const previouslyFocused = document.activeElement as HTMLElement | null
    const { body } = document

    if (lockCount === 1) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
      body.style.overflow = 'hidden'
      if (scrollbarWidth > 0) {
        body.style.paddingRight = `${scrollbarWidth}px`
      }
    }

    panelRef?.current?.focus()

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation()
        if (openStack[openStack.length - 1] === id) onClose()
        return
      }
      if (panelRef?.current) trapTabKey(event, panelRef.current)
    }

    document.addEventListener('keydown', handleKeydown)

    return () => {
      document.removeEventListener('keydown', handleKeydown)
      openStack.splice(openStack.indexOf(id), 1)
      lockCount--
      if (lockCount === 0) {
        body.style.overflow = ''
        body.style.paddingRight = ''
      }
      previouslyFocused?.focus()
    }
  }, [open, onClose])
}
