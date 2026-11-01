import { cleanup } from '@testing-library/preact'
import { afterEach } from 'vitest'

if (typeof window !== 'undefined') {
  window.requestAnimationFrame = (cb: (time: number) => void) =>
    setTimeout(() => cb(performance.now()), 16) as unknown as number
  window.cancelAnimationFrame = (id: number) => clearTimeout(id as unknown as ReturnType<typeof setTimeout>)

  afterEach(() => {
    cleanup()
  })
}
