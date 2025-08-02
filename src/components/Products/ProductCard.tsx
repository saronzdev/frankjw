import { useState, useEffect, useRef } from 'preact/hooks'
import { handleReservation } from '@/shared/utils'
import type { ProductType } from '@/types'
import noImage from '@/assets/no-image.svg'
import edit from '@/assets/edit.svg'
import trash from '@/assets/trash.svg'
import buy from '@/assets/buy.svg'
import styles from '@/styles/ProductCard.module.css'

interface Props {
  data: ProductType
  editable?: boolean
  onEdit?: (product: ProductType) => void
  onDelete?: (id: number) => void
}

export function ProductCard({ data, editable = false, onDelete, onEdit }: Props) {
  const [isImageLoading, setIsImageLoading] = useState(true)
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)
  const [isDescriptionLong, setIsDescriptionLong] = useState(false)
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const [hl, setHl] = useState<string | null>(null)

  useEffect(() => {
    const id = window.location.hash.slice(1)
    if (id) {
      const el = document.getElementById(id)
      const header = document.getElementById('header')

      if (el) {
        const headerHeight = header?.offsetHeight || 0
        const y = el.getBoundingClientRect().top + window.scrollY - headerHeight - 20

        window.scrollTo({ top: y, behavior: 'instant' })
        setHl(id)
      }
    }
  }, [])

  useEffect(() => {
    const element = descriptionRef.current
    if (!element) return

    const checkOverflow = () => {
      if (!element) return
      if (!isDescriptionExpanded) {
        window.requestAnimationFrame(() => {
          const isOverflowing = element.scrollHeight > element.clientHeight
          setIsDescriptionLong(isOverflowing)
        })
      }
    }

    checkOverflow()

    const resizeObserver = new ResizeObserver(checkOverflow)
    resizeObserver.observe(element)

    return () => resizeObserver.disconnect()
  }, [data.description, isDescriptionExpanded])

  const handleDelete = () => {
    if (confirm(`¿Estás seguro de que quieres eliminar "${data.name}"?`)) {
      onDelete?.(data.id)
    }
  }

  const firstImage = data.pictures && data.pictures.length > 0 ? data.pictures[0] : noImage

  return (
    <div className={hl === data.productId ? styles.cardHighlight : styles.card} id={data.productId}>
      <div className={styles.imageContainer}>
        <div className={styles.imageWrapper}>
          {isImageLoading && (
            <div className={styles.loadingSpinner}>
              <div className={styles.spinner}></div>
            </div>
          )}
          <img
            className={styles.productImage}
            src={firstImage}
            alt={data.name}
            loading="lazy"
            onLoad={() => setIsImageLoading(false)}
            onError={() => setIsImageLoading(false)}
          />

          <div className={styles.badgeContainer}>
            <span className={styles.priceBadge}>{data.price} USD</span>
          </div>

          {data.isActive === false && (
            <div className={styles.outOfStockContainer}>
              <span className={styles.outOfStockBadge}>Agotado</span>
            </div>
          )}
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.descriptionSection}>
          <div>
            <p
              ref={descriptionRef}
              className={`${styles.description} ${isDescriptionExpanded ? '' : styles.descriptionClamped}`}
            >
              {data.description}
            </p>
            {(isDescriptionLong || isDescriptionExpanded) && (
              <button
                onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                className={styles.expandButton}
                aria-label={`Botón de ${isDescriptionExpanded ? 'Ver menos' : 'Ver más'}`}
              >
                {isDescriptionExpanded ? 'Ver menos' : 'Ver más'}
              </button>
            )}
          </div>
        </div>

        <div className={styles.statsGrid}>
          <div className={`${styles.statCard} ${styles.weightCard}`}>
            <p className={`${styles.statLabel} ${styles.weightLabel}`}>Peso</p>
            <p className={`${styles.statValue} ${styles.weightValue}`}>{data.weight} g</p>
          </div>
          <div className={`${styles.statCard} ${styles.karatsCard}`}>
            <p className={`${styles.statLabel} ${styles.karatsLabel}`}>Quilates</p>
            <p className={`${styles.statValue} ${styles.karatsValue}`}>{data.karats.join(' | ')} K</p>
          </div>
        </div>

        <div className={styles.actionsContainer}>
          {editable ? (
            <div className={styles.editableActions}>
              <button
                onClick={() => onEdit?.(data)}
                className={`${styles.button} ${styles.editButton}`}
                aria-label={`Editar producto ${data.name}`}
              >
                <img className={styles.buttonIcon} src={edit} alt="Icono de Editar" />
                Editar
              </button>
              <button
                onClick={handleDelete}
                className={`${styles.button} ${styles.deleteButton}`}
                aria-label={`Eliminar producto ${data.name}`}
              >
                <img className={styles.buttonIcon} src={trash} alt="Icono de Borrar" />
                Eliminar
              </button>
            </div>
          ) : (
            <>
              {data.isActive === false && (
                <div className={styles.outOfStockNotice}>
                  <p className={styles.outOfStockText}>Producto agotado, pero aún puedes reservarlo</p>
                </div>
              )}
              <button
                onClick={() => handleReservation(data)}
                className={`${styles.button} ${styles.reserveButton}`}
                aria-label={`Reservar ${data.name} por WhatsApp`}
              >
                <img className={`${styles.buttonIcon} ${styles.reserveIcon}`} src={buy} alt="Reservar" />
                Reservar por WhatsApp
              </button>
            </>
          )}
        </div>

        {editable && (
          <div className={styles.productIdSection}>
            <p className={styles.productId}>ID: {data.productId}</p>
          </div>
        )}
      </div>
    </div>
  )
}
