import { ReserveCard } from './ReserveCard'
import { SELLERS } from '@/shared/constants'
import styles from '@/styles/ReservePopup.module.css'
import type { ProductType } from '@/types'

interface Props {
  data: ProductType
  onClose: () => void
}

export function ReservePopup({ data, onClose }: Props) {
  const handleOverlayClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <button onClick={onClose} className={styles.close} aria-label="Cerrar">
          ✕
        </button>
        <h2 className={styles.title}>Contactar para reservar</h2>
        <div className={styles.sellers}>
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
      </div>
    </div>
  )
}
