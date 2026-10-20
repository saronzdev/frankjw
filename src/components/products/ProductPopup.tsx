import { useEffect, useState } from 'preact/hooks'
import type { ProductType } from '@/types'
import noImage from '@/assets/no-image.svg'
import { ChevronLeft, ChevronRight } from 'lucide-preact'
import { Modal } from '@/ui/Modal'
import { IconButton } from '@/ui/IconButton'
import { Button } from '@/ui/Button'
import { optimizeImage } from '@/shared/utils'
import { ReservePopup } from '../ReservePopup'

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
      if (e.key === 'ArrowLeft') {
        prevImage()
      } else if (e.key === 'ArrowRight') {
        nextImage()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [currentImageIndex])

  return (
    <Modal open onClose={onClose} title="Detalles del producto" size="lg" tall padded={false}>
      <div class="flex h-full flex-col">
        <div class="relative min-h-0 flex-1 bg-surface-2">
          <img
            class="absolute inset-0 h-full w-full object-contain"
            src={optimizeImage(images[currentImageIndex] || noImage, 900, 70)}
            alt={`${product.description} - imagen ${currentImageIndex + 1}`}
            loading="eager"
            decoding="async"
          />
          {images.length > 1 && (
            <>
              <IconButton
                label="Imagen anterior"
                onClick={prevImage}
                class="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/85 shadow-sm"
              >
                <ChevronLeft size={18} aria-hidden="true" />
              </IconButton>
              <IconButton
                label="Siguiente imagen"
                onClick={nextImage}
                class="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/85 shadow-sm"
              >
                <ChevronRight size={18} aria-hidden="true" />
              </IconButton>
              <div class="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-black/55 px-2.5 py-0.5 text-xs text-white">
                {currentImageIndex + 1} / {images.length}
              </div>
            </>
          )}
        </div>

        <div class="flex flex-col gap-4 overflow-y-auto p-5">
          <p class="text-sm leading-relaxed text-ink-soft">{product.description}</p>

          <div class="grid grid-cols-3 gap-3 rounded-md bg-gold-soft/60 p-4 text-center">
            <div class="flex flex-col gap-0.5">
              <span class="text-xs font-medium uppercase tracking-[0.06em] text-ink-muted">Precio</span>
              {product.hasDiscount && product.offerPrice ? (
                <div class="flex items-center justify-center gap-1.5">
                  <span class="text-sm text-ink-muted line-through">${product.price}</span>
                  <span class="text-base font-semibold text-ink">${product.offerPrice}</span>
                </div>
              ) : (
                <span class="text-base font-semibold text-ink">${product.price}</span>
              )}
            </div>
            {product.weight && (
              <div class="flex flex-col gap-0.5">
                <span class="text-xs font-medium uppercase tracking-[0.06em] text-ink-muted">Peso</span>
                <span class="text-base font-semibold text-ink">{product.weight} g</span>
              </div>
            )}
            {product.karats && product.karats.length > 0 && (
              <div class="flex flex-col gap-0.5">
                <span class="text-xs font-medium uppercase tracking-[0.06em] text-ink-muted">Kilates</span>
                <span class="text-base font-semibold text-ink">{product.karats.join('K / ')}K</span>
              </div>
            )}
          </div>

          <Button block onClick={toggleReserve}>
            Reservar
          </Button>

          {allProducts.length > 1 && onNavigate && (
            <div class="flex items-center justify-between border-t border-line pt-3">
              <button
                type="button"
                onClick={prevProduct}
                aria-label="Producto anterior"
                class="inline-flex items-center gap-1 text-sm text-ink-soft underline-offset-4 transition-colors hover:text-ink hover:underline"
              >
                <ChevronLeft size={16} aria-hidden="true" />
                Anterior
              </button>
              <span class="text-xs text-ink-muted">
                {currentIndex + 1} / {allProducts.length}
              </span>
              <button
                type="button"
                onClick={nextProduct}
                aria-label="Siguiente producto"
                class="inline-flex items-center gap-1 text-sm text-ink-soft underline-offset-4 transition-colors hover:text-ink hover:underline"
              >
                Siguiente
                <ChevronRight size={16} aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      </div>

      {isReserve && <ReservePopup onClose={toggleReserve} data={product} />}
    </Modal>
  )
}
