import type { ProductType } from '@/types'
import { ProductCard } from './ProductCard'

interface Props {
  products: ProductType[]
  editable?: boolean
  onEdit?: (product: ProductType) => void
  onDelete?: (id: number) => void
}

export function ProductGrid({ products, editable = false, onEdit, onDelete }: Props) {
  return (
    <div class="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          data={product}
          editable={editable}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
