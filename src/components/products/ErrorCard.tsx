import { TriangleAlert } from 'lucide-preact'

interface Props {
  message: string
  onRetry?: () => void
}

export function ErrorCard({ message, onRetry }: Props) {
  const retry = onRetry ?? (() => window.location.reload())

  return (
    <div role="alert" class="mx-auto flex max-w-md flex-col items-center gap-3 px-4 py-12 text-center">
      <TriangleAlert size={18} aria-hidden="true" class="text-danger" />
      <p class="text-sm text-ink-soft">{message}</p>
      <button
        type="button"
        onClick={retry}
        class="text-sm font-medium text-gold-deep underline underline-offset-4 transition-colors hover:text-ink"
      >
        Intentar de nuevo
      </button>
    </div>
  )
}
