import { Drawer } from '@/ui/Drawer'
import { ProductFilters } from './ProductFilters'

interface Props {
  open: boolean
  onClose: () => void
  priceRange: [number, number]
  selectedKarats: number[]
  onSale: boolean
  onPriceChange: (range: [number, number]) => void
  onKaratsChange: (karats: number[]) => void
  onSaleChange: (onSale: boolean) => void
  onReset: () => void
}

export function FiltersDrawer({
  open,
  onClose,
  priceRange,
  selectedKarats,
  onSale,
  onPriceChange,
  onKaratsChange,
  onSaleChange,
  onReset
}: Props) {
  return (
    <Drawer open={open} onClose={onClose} title="Filtros">
      <ProductFilters
        priceRange={priceRange}
        selectedKarats={selectedKarats}
        onSale={onSale}
        onPriceChange={onPriceChange}
        onKaratsChange={onKaratsChange}
        onSaleChange={onSaleChange}
        onReset={onReset}
      />
    </Drawer>
  )
}
