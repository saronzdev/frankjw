import { useEffect } from 'preact/hooks'
import type { ProductType } from '@/types'
import styles from '@/styles/ProductPopup.module.css'
import noImage from '@/assets/no-image.svg'

type Props = {
  product: ProductType
  image: string
  onClose: () => void
}

export function ProductPopup({ product, image, onClose }: Props) {
  const handleOverlayClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose()
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <button onClick={onClose} className={styles.close}>
          ✕
        </button>
        <h2 className={styles.title}>Detalles del producto</h2>
        <img className={styles.image} src={image || noImage} alt={product.description} />
        <p className={styles.description}>{product.description}</p>

        <div className={styles.info}>
          <div>
            <span>Precio</span>
            <strong>${product.price}</strong>
          </div>
          {product.weight && (
            <div>
              <span>Peso</span>
              <strong>{product.weight} g</strong>
            </div>
          )}
          {product.karats && (
            <div>
              <span>Kilates</span>
              <strong>{product.karats.join(' ')} K</strong>
            </div>
          )}
        </div>

        <button className={styles.reserve}>Reservar</button>
      </div>
    </div>
  )
}
