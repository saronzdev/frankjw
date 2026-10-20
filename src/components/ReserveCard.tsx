import { handleReservation } from '@/shared/utils'
import type { ProductType, Seller } from '@/types'
import wsIcon from '@/assets/ws.svg'
import { Button } from '@/ui/Button'

type Props = Seller & { data: ProductType }

export function ReserveCard({ name, number, location, data }: Props) {
  return (
    <div class="flex flex-col gap-3 rounded-md border border-line p-3.5">
      <div class="flex flex-col gap-0.5">
        <h3 class="font-display text-base font-semibold text-ink">{name}</h3>
        <p class="text-xs text-ink-muted">{location}</p>
      </div>
      <Button variant="gold" size="sm" block onClick={() => handleReservation(number, data)}>
        <img src={wsIcon} alt="" class="h-4 w-4" aria-hidden="true" />
        <span>Reservar por WhatsApp</span>
      </Button>
    </div>
  )
}
