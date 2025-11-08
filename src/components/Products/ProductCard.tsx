import { useState } from 'preact/hooks'
import { createPortal } from 'preact/compat'
import { ProductPopup } from './ProductPopup'
import { ReservePopup } from '../ReservePopup'
import type { ProductType } from '@/types'
import noImage from '@/assets/no-image.svg'
import noStock from '@/assets/nostock.svg'
import shop from '@/assets/shop.svg'
import info from '@/assets/info.svg'
import editIcon from '@/assets/edit.svg'
import trashIcon from '@/assets/trash.svg'
import styles from '@/styles/ProductCard.module.css'
import { normalize } from '@/shared/utils'

interface Props {
  data: ProductType
  editable?: boolean
  onEdit?: (product: ProductType) => void
  onDelete?: (id: number) => void
  allProducts?: ProductType[]
  productIndex?: number
}

export function ProductCard({ data, editable = false, onEdit, onDelete, allProducts = [], productIndex = 0 }: Props) {
  const [isLoading, setIsLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const [currentProductIndex, setCurrentProductIndex] = useState(productIndex)
  const [isReserve, setIsReserve] = useState(false)

  const close = () => setIsOpen(false)

  const handleNavigate = (newIndex: number) => {
    setCurrentProductIndex(newIndex)
  }

  const currentProduct = allProducts.length > 0 ? allProducts[currentProductIndex] : data

  const firstImage = data.pictures && data.pictures.length > 0 ? data.pictures[0] : noImage
  const name = normalize(data.description.split(',')[0])

  const handleDelete = () => {
    if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      onDelete?.(data.id)
    }
  }

  const toogleReserve = () => {
    setIsReserve(!isReserve)
  }

  return (
    <div className={`${styles.card} ${isOpen ? styles['popup-open'] : ''}`}>
      <div className={styles.picture}>
        {isLoading && (
          <div className={styles.loadingSpinner}>
            <div className={styles.spinner}></div>
          </div>
        )}
        {!data.isActive && <img className={styles.status} src={noStock} />}
        <img
          className={styles.product}
          src={firstImage || noImage}
          onClick={() => setIsOpen(true)}
          loading="lazy"
          onLoad={() => setIsLoading(false)}
          onError={() => setIsLoading(false)}
        />
        {editable && (
          <div className={styles.editActions}>
            <button className={styles.iconButton} aria-label={`Editar ${data.productId}`} onClick={() => onEdit?.(data)}>
              <img src={editIcon} alt="" />
            </button>
            <button className={styles.iconButton} aria-label={`Eliminar ${data.productId}`} onClick={handleDelete}>
              <img src={trashIcon} alt="" />
            </button>
            <span className={styles.productId}>{data.productId}</span>
          </div>
        )}
      </div>
      <div>
        <p className={styles.name}>{name}</p>
      </div>
      <div className={styles.footer}>
        <p className={styles.price}>${data.price}</p>
        {!editable && (
          <div className={styles.actions}>
            <img className={styles.shop} src={shop} onClick={toogleReserve} title="Reservar" />
            <img className={styles.details} src={info} onClick={() => setIsOpen(true)} title="Ver detalles" />
          </div>
        )}
      </div>
      {isOpen &&
        createPortal(
          <ProductPopup
            product={currentProduct}
            onClose={close}
            allProducts={allProducts}
            currentIndex={currentProductIndex}
            onNavigate={handleNavigate}
          />,
          document.body
        )}
      {isReserve && createPortal(<ReservePopup data={data} onClose={toogleReserve} />, document.body)}
    </div>
  )
}
