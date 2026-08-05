import { handleReservation } from '@/shared/utils'
import type { ProductType, Seller } from '@/types'
import styles from '@/styles/ReserveCard.module.css'
import wsIcon from '@/assets/ws.svg'

type Props = Seller & { data: ProductType }

export function ReserveCard({ name, number, location, data }: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.info}>
          <h3 className={styles.name}>{name}</h3>
          <p className={styles.location}>{location}</p>
        </div>
      </div>
      <button onClick={() => handleReservation(number, data)} className={styles.button}>
        <img src={wsIcon} alt="" className={styles.buttonIcon} />
        <span>Reservar por WhatsApp</span>
      </button>
    </div>
  )
}
