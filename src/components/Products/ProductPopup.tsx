import { useEffect, useState } from 'preact/hooks'
import { createPortal } from 'preact/compat'
import type { ProductType } from '@/types'
import styles from '@/styles/ProductPopup.module.css'
import noImage from '@/assets/no-image.svg'
import leftArrow from '@/assets/left.svg'
import rightArrow from '@/assets/right.svg'
import { ContactPopup } from '../ContactPopup'

type Props = {
  product: ProductType
  onClose: () => void
  allProducts?: ProductType[]
  currentIndex?: number
  onNavigate?: (index: number) => void
}

export function ProductPopup({ product, onClose, allProducts = [], currentIndex = 0, onNavigate }: Props) {
  const images = product.pictures && product.pictures.length > 0 ? product.pictures : [noImage]
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isReserve, setIsReserve] = useState(false)

  const handleOverlayClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const prevProduct = () => {
    if (onNavigate && allProducts.length > 0) {
      const newIndex = currentIndex === 0 ? allProducts.length - 1 : currentIndex - 1
      onNavigate(newIndex)
      setCurrentImageIndex(0)
    }
  }

  const nextProduct = () => {
    if (onNavigate && allProducts.length > 0) {
      const newIndex = currentIndex === allProducts.length - 1 ? 0 : currentIndex + 1
      onNavigate(newIndex)
      setCurrentImageIndex(0)
    }
  }

  const toggleReserve = () => {
    setIsReserve(!isReserve)
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowLeft') {
        prevImage()
      } else if (e.key === 'ArrowRight') {
        nextImage()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [currentImageIndex, onClose])

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <button onClick={onClose} className={styles.close}>
          ✕
        </button>
        <h2 className={styles.title}>Detalles del producto</h2>

        <div className={styles.imageContainer}>
          {images.length > 1 && (
            <button onClick={prevImage} className={styles.imageNavLeft} aria-label="Imagen anterior">
              <img src={leftArrow} alt="Anterior" />
            </button>
          )}
          <img
            className={styles.image}
            src={images[currentImageIndex] || noImage}
            alt={`${product.description} - imagen ${currentImageIndex + 1}`}
          />
          {images.length > 1 && (
            <button onClick={nextImage} className={styles.imageNavRight} aria-label="Siguiente imagen">
              <img src={rightArrow} alt="Siguiente" />
            </button>
          )}
        </div>

        {images.length > 1 && (
          <div className={styles.imageIndicator}>
            {currentImageIndex + 1} / {images.length}
          </div>
        )}

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

        <button className={styles.reserve} onClick={toggleReserve}>
          Reservar
        </button>

        {allProducts.length > 1 && onNavigate && (
          <div className={styles.productNav}>
            <button onClick={prevProduct} className={styles.productNavButton} aria-label="Producto anterior">
              <img src={leftArrow} alt="Anterior" />
              <span>Anterior</span>
            </button>
            <span className={styles.productCounter}>
              {currentIndex + 1} / {allProducts.length}
            </span>
            <button onClick={nextProduct} className={styles.productNavButton} aria-label="Siguiente producto">
              <span>Siguiente</span>
              <img src={rightArrow} alt="Siguiente" />
            </button>
          </div>
        )}
      </div>
      {isReserve && createPortal(<ContactPopup onClose={toggleReserve} data={product} />, document.body)}
    </div>
  )
}
