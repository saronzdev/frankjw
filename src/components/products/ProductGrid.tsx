import type { ProductType } from '@/types'
import { ProductCard } from './ProductCard'
import { ProductCardSkeleton } from './ProductCardSkeleton'

export const GRID_CLASSES = 'grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4'

interface Props {
  products: ProductType[]
  editable?: boolean
  onEdit?: (product: ProductType) => void
  onDelete?: (id: number) => void
}

export function ProductGrid({ products, editable = false, onEdit, onDelete }: Props) {
  return (
    <div class={GRID_CLASSES}>
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          data={product}
          editable={editable}
          onEdit={onEdit}
          onDelete={onDelete}
          priority={index < 4}
        />
      ))}
    </div>
  )
}

export function ProductGridSkeleton() {
  return (
    <div class={GRID_CLASSES} role="status" aria-live="polite" aria-busy="true">
      <span class="sr-only">Cargando productos</span>
      {Array.from({ length: 8 }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  )
}
