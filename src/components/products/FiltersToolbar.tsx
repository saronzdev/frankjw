import { SlidersHorizontal } from 'lucide-preact'
import { SortSelect } from './SortSelect'

interface Props {
  sortValue: string
  onSortChange: (value: string) => void
  onOpenFilters: () => void
}

/** Barra flotante con orden y acceso a filtros; se ancla bajo el header con `sticky`. */
export function FiltersToolbar({ sortValue, onSortChange, onOpenFilters }: Props) {
  return (
    <div class="flex items-center justify-between gap-3 border-b border-line/70 py-2">
      <SortSelect value={sortValue} onChange={onSortChange} />
      <button
        type="button"
        onClick={onOpenFilters}
        class="inline-flex h-9 items-center gap-2 rounded-md border border-line bg-surface px-3 text-sm text-ink transition-colors hover:border-ink/30 hover:bg-surface-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
      >
        <SlidersHorizontal size={16} aria-hidden="true" />
        Filtros
      </button>
    </div>
  )
}
