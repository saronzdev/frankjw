const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

export function getFocusable(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
    (el) => el.offsetParent !== null || el === document.activeElement
  )
}

/** Cycles Tab focus within a container. Returns true when the event was handled. */
export function trapTabKey(event: KeyboardEvent, container: HTMLElement): boolean {
  if (event.key !== 'Tab') return false

  const focusable = getFocusable(container)
  if (focusable.length === 0) {
    event.preventDefault()
    return true
  }

  const first = focusable[0]
  const last = focusable[focusable.length - 1]

  if (event.shiftKey) {
    if (document.activeElement === first || document.activeElement === container) {
      event.preventDefault()
      last.focus()
      return true
    }
  } else if (document.activeElement === last) {
    event.preventDefault()
    first.focus()
    return true
  }

  return false
}
