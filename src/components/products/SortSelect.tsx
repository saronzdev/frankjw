import { ArrowUpDown, ChevronDown } from 'lucide-preact'

interface Props {
  value: string
  onChange: (value: string) => void
}

export function SortSelect({ value, onChange }: Props) {
  return (
    <div class="relative inline-block">
      <ArrowUpDown
        size={14}
        aria-hidden="true"
        class="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-ink-muted"
      />
      <select
        class="h-9 cursor-pointer appearance-none rounded-md border border-line bg-surface pl-8 pr-8 text-sm text-ink transition-colors hover:border-ink/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
        value={value}
        onChange={(e) => onChange((e.target as HTMLSelectElement).value)}
        aria-label="Ordenar productos"
      >
        <option value="default">Últimos</option>
        <option value="name">Nombre (A-Z)</option>
        <option value="price-asc">Precio ↑</option>
        <option value="price-desc">Precio ↓</option>
        <option value="weight">Peso ↓</option>
      </select>
      <ChevronDown
        size={14}
        aria-hidden="true"
        class="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-ink-muted"
      />
    </div>
  )
}
