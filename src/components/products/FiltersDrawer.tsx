import { Drawer } from '@/ui/Drawer'
import { ProductFilters } from './ProductFilters'

interface Props {
  open: boolean
  onClose: () => void
  priceRange: [number, number]
  selectedKarats: number[]
  onSale: boolean
  preciousStones: boolean
  onPriceChange: (range: [number, number]) => void
  onKaratsChange: (karats: number[]) => void
  onSaleChange: (onSale: boolean) => void
  onPreciousStonesChange: (preciousStones: boolean) => void
  onReset: () => void
}

export function FiltersDrawer({
  open,
  onClose,
  priceRange,
  selectedKarats,
  onSale,
  preciousStones,
  onPriceChange,
  onKaratsChange,
  onSaleChange,
  onPreciousStonesChange,
  onReset
}: Props) {
  return (
    <Drawer open={open} onClose={onClose} title="Filtros">
      <ProductFilters
        priceRange={priceRange}
        selectedKarats={selectedKarats}
        onSale={onSale}
        preciousStones={preciousStones}
        onPriceChange={onPriceChange}
        onKaratsChange={onKaratsChange}
        onSaleChange={onSaleChange}
        onPreciousStonesChange={onPreciousStonesChange}
        onReset={onReset}
      />
    </Drawer>
  )
}
