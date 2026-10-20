import { commonKarats } from '@/shared/constants'
import { cx } from '@/ui/cx'

interface Props {
  priceRange: [number, number]
  selectedKarats: number[]
  onSale: boolean
  onPriceChange: (range: [number, number]) => void
  onKaratsChange: (karats: number[]) => void
  onSaleChange: (onSale: boolean) => void
  onReset: () => void
}

export function ProductFilters({
  priceRange,
  selectedKarats,
  onSale,
  onPriceChange,
  onKaratsChange,
  onSaleChange,
  onReset
}: Props) {
  const handleKaratToggle = (karat: number) => {
    if (selectedKarats.includes(karat)) {
      onKaratsChange(selectedKarats.filter((k) => k !== karat))
    } else {
      onKaratsChange([...selectedKarats, karat])
    }
  }

  return (
    <div class="flex flex-col gap-6">
      <div class="flex items-center justify-between">
        <h3 class="font-display text-base font-semibold text-ink">Filtros</h3>
        <button
          type="button"
          onClick={onReset}
          class="text-sm text-gold-deep underline-offset-4 transition-colors hover:text-gold hover:underline"
        >
          Limpiar
        </button>
      </div>

      <div class="flex flex-col gap-2">
        <label class="text-xs font-medium uppercase tracking-[0.06em] text-ink-muted">Precio (USD)</label>
        <div class="flex gap-2">
          <input
            type="number"
            class="h-9 w-full rounded-md border border-line bg-surface px-3 text-sm text-ink placeholder:text-ink-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            placeholder="Mín"
            value={priceRange[0] || ''}
            onChange={(e) => onPriceChange([Number((e.target as HTMLInputElement).value) || 0, priceRange[1]])}
            min="0"
          />
          <input
            type="number"
            class="h-9 w-full rounded-md border border-line bg-surface px-3 text-sm text-ink placeholder:text-ink-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            placeholder="Máx"
            value={priceRange[1] || ''}
            onChange={(e) => onPriceChange([priceRange[0], Number((e.target as HTMLInputElement).value) || 0])}
            min="0"
          />
        </div>
      </div>

      <div class="flex flex-col gap-2">
        <span class="text-xs font-medium uppercase tracking-[0.06em] text-ink-muted">Kilates</span>
        <div class="flex flex-wrap gap-1.5">
          {commonKarats.map((karat) => {
            const checked = selectedKarats.includes(karat)
            return (
              <label
                key={karat}
                class={cx(
                  'inline-flex cursor-pointer items-center rounded-full border px-3 py-1 text-sm transition-colors',
                  checked
                    ? 'border-ink bg-ink text-white'
                    : 'border-line bg-surface text-ink-soft hover:border-ink/30'
                )}
              >
                <input type="checkbox" class="sr-only" checked={checked} onChange={() => handleKaratToggle(karat)} />
                {karat}K
              </label>
            )
          })}
        </div>
      </div>

      <div>
        <label class="flex cursor-pointer items-center gap-2 text-sm text-ink-soft">
          <input
            type="checkbox"
            class="accent-gold"
            checked={onSale}
            onChange={(e) => onSaleChange((e.target as HTMLInputElement).checked)}
          />
          <span>Solo productos en oferta</span>
        </label>
      </div>
    </div>
  )
}
