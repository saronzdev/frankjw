import { Spinner } from '@/ui/Spinner'

export function LoadingCard() {
  return (
    <div class="flex justify-center px-4 py-24">
      <div class="flex items-center gap-3 text-ink-muted">
        <Spinner />
        <p class="text-sm">Cargando...</p>
      </div>
    </div>
  )
}
