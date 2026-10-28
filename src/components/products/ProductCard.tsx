import { useState, lazy, Suspense } from 'preact/compat'
import type { ProductType } from '@/types'
import { ShoppingBag, Info, Pencil, Trash2, Diamond } from 'lucide-preact'
import noImage from '@/assets/no-image.svg'
import { normalize, optimizeImage, buildSrcSet } from '@/shared/utils'
import { Badge } from '@/ui/Badge'
import { IconButton } from '@/ui/IconButton'
import { Spinner } from '@/ui/Spinner'
import { cx } from '@/ui/cx'

const ProductPopup = lazy(() => import('./ProductPopup').then((m) => ({ default: m.ProductPopup })))
const ReservePopup = lazy(() => import('../ReservePopup').then((m) => ({ default: m.ReservePopup })))

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
  const hasOffer = data.hasDiscount && !!data.offerPrice

  const handleDelete = () => {
    if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      onDelete?.(data.id)
    }
  }

  const toggleReserve = () => {
    setIsReserve(!isReserve)
  }

  return (
    <div class="group flex flex-col overflow-hidden rounded-lg border border-line bg-surface shadow-sm transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:border-gold/60 hover:shadow-lg">
      <div class="relative">
        <button
          type="button"
          class="relative aspect-4/5 w-full cursor-pointer overflow-hidden bg-surface text-left"
          aria-label={`Ver ${name}`}
          aria-haspopup="dialog"
          onClick={() => setIsOpen(true)}
        >
          {isLoading && (
            <div class="absolute inset-0 z-10 grid place-items-center">
              <Spinner />
            </div>
          )}
          {!data.isActive && <Badge tone="danger" class="absolute right-2 top-2 z-20">Agotado</Badge>}

          <img
            class={cx(
              'h-full w-full object-cover object-center transition-opacity duration-300',
              isLoading && 'opacity-0'
            )}
            src={optimizeImage(firstImage, 480)}
            srcSet={buildSrcSet(firstImage)}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            alt={name}
            loading="lazy"
            decoding="async"
            onLoad={() => setIsLoading(false)}
            onError={() => setIsLoading(false)}
          />
        </button>
        {data.hasPreciousStones && (
          <Badge
            tone="diamond"
            class="pointer-events-none absolute bottom-2 left-2 z-20"
            aria-label="Contiene piedras preciosas"
            title="Contiene piedras preciosas"
          >
            <Diamond size={12} aria-hidden="true" />
            Piedras
          </Badge>
        )}
        {editable && (
          <div class="absolute left-2 top-2 z-20 flex items-center gap-1.5">
            <IconButton
              size="sm"
              label={`Editar ${data.productId}`}
              onClick={() => onEdit?.(data)}
              class="border border-line bg-white/90 shadow-sm"
            >
              <Pencil size={14} aria-hidden="true" />
            </IconButton>
            <IconButton
              size="sm"
              label={`Eliminar ${data.productId}`}
              onClick={handleDelete}
              class="border border-line bg-white/90 shadow-sm"
            >
              <Trash2 size={14} aria-hidden="true" />
            </IconButton>
            <Badge class="border border-line bg-white/90">{data.productId}</Badge>
          </div>
        )}
      </div>
      <div class="flex flex-1 flex-col gap-1.5 p-3">
        <p class="line-clamp-2 text-sm leading-snug text-ink-soft">{name}</p>
        <div class="mt-auto flex items-end justify-between gap-2 pt-1">
          {hasOffer ? (
            <div class="flex flex-col gap-0.5">
              <div class="flex items-center gap-1.5">
                <span class="text-xs text-ink-muted line-through">${data.price}</span>
                <Badge tone="danger">-${(data.price - (data.offerPrice as number)).toFixed(2)}</Badge>
              </div>
              <span class="text-base font-semibold text-ink">${data.offerPrice}</span>
            </div>
          ) : (
            <span class="text-base font-semibold text-ink">${data.price}</span>
          )}
          {!editable && (
            <div class="flex gap-1">
              <IconButton
                size="sm"
                label={`Reservar ${data.productId}`}
                title="Reservar"
                onClick={toggleReserve}
              >
                <ShoppingBag size={16} aria-hidden="true" />
              </IconButton>
              <IconButton
                size="sm"
                label={`Ver detalles de ${data.productId}`}
                title="Ver detalles"
                onClick={() => setIsOpen(true)}
              >
                <Info size={16} aria-hidden="true" />
              </IconButton>
            </div>
          )}
        </div>
      </div>
      {isOpen && (
        <Suspense fallback={null}>
          <ProductPopup
            product={currentProduct}
            onClose={close}
            allProducts={allProducts}
            currentIndex={currentProductIndex}
            onNavigate={handleNavigate}
          />
        </Suspense>
      )}
      {isReserve && <ReservePopup data={data} onClose={toggleReserve} />}
    </div>
  )
}
