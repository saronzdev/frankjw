// @vitest-environment happy-dom
import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/preact'
import { Modal } from '@/ui/Modal'

describe('Modal / useOverlayBehavior', () => {
  it('renderiza un dialog con aria-modal, focusable y con título accesible', () => {
    const { baseElement } = render(
      <Modal open title="Galería" onClose={() => {}}>
        <button>contenido</button>
      </Modal>
    )
    const dialog = baseElement.querySelector('[role="dialog"]') as HTMLElement
    expect(dialog).toBeTruthy()
    expect(dialog.getAttribute('aria-modal')).toBe('true')
    expect(dialog.getAttribute('aria-label')).toBe('Galería')
  })

  it('cierra con Escape exactamente una vez', async () => {
    let closed = 0
    render(
      <Modal
        open
        title="Galería"
        onClose={() => {
          closed++
        }}
      />
    )
    expect(closed).toBe(0)
    document.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true }))
    await new Promise((r) => setTimeout(r, 60))
    expect(closed).toBe(1)
  })

  it('no renderiza nada con open=false', () => {
    // happy-dom: los portales cerrados de tests previos quedan en el DOM (en navegador reales se retiran)
    document.body.querySelectorAll('.fixed.inset-0').forEach((n) => n.remove())
    const { baseElement } = render(
      <Modal open={false} title="x" onClose={() => {}} />
    )
    expect(baseElement.querySelectorAll('[role="dialog"]').length).toBe(0)
  })
})
