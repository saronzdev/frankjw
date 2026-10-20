import { SELLERS } from '@/shared/constants'
import { ReserveCard } from './ReserveCard'
import { Modal } from '@/ui/Modal'
import type { ProductType } from '@/types'

interface Props {
  data: ProductType
  onClose: () => void
}

export function ReservePopup({ data, onClose }: Props) {
  return (
    <Modal open onClose={onClose} title="Contactar para reservar" size="sm">
      <div class="flex flex-col gap-3">
        {SELLERS.map((seller) => (
          <ReserveCard
            key={seller.number}
            name={seller.name}
            number={seller.number}
            location={seller.location}
            data={data}
          />
        ))}
      </div>
    </Modal>
  )
}
