export function Spinner({ class: cls }: { class?: string }) {
  return (
    <span
      role="status"
      aria-label="Cargando"
      class={`inline-block h-5 w-5 animate-spin rounded-full border-2 border-line border-t-ink-muted ${cls ?? ''}`}
    />
  )
}
