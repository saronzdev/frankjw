import { CircleX } from 'lucide-preact'
import { Button } from '@/ui/Button'

interface Props {
  message: string
}

export function ErrorCard({ message }: Props) {
  return (
    <div class="grid place-items-center px-4 py-24">
      <div class="flex max-w-md flex-col items-center gap-4 text-center">
        <div class="grid h-14 w-14 place-items-center rounded-full bg-red-100 text-danger">
          <CircleX size={26} aria-hidden="true" />
        </div>
        <div class="flex flex-col gap-1">
          <h3 class="font-display text-xl font-semibold text-ink">¡Ups!</h3>
          <p class="text-sm text-ink-muted">{message}</p>
        </div>
        <Button variant="outline" onClick={() => window.location.reload()}>
          Intentar de nuevo
        </Button>
      </div>
    </div>
  )
}
