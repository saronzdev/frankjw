import type { JSX } from 'preact'
import { Search as SearchIcon, X } from 'lucide-preact'

interface Props {
  searchTerm: string
  setSearchTerm: (value: string) => void
  handlerSearch: (term: string) => void
  placeholder: string
}

export function Search({ searchTerm, setSearchTerm, handlerSearch, placeholder }: Props) {
  const handleInputChange = (e: JSX.TargetedEvent<HTMLInputElement, Event>) => {
    handlerSearch(e.currentTarget.value)
  }

  const clearSearch = () => {
    setSearchTerm('')
    handlerSearch('')
  }

  return (
    <div class="relative">
      <input
        class="h-9 w-full min-w-0 rounded-md border border-line bg-surface pl-3 pr-8 text-sm text-ink placeholder:text-ink-muted transition-colors hover:border-ink/30 focus-visible:outline-none focus-visible:border-gold focus-visible:ring-2 focus-visible:ring-gold/35"
        type="text"
        placeholder={placeholder}
        onChange={handleInputChange}
        value={searchTerm}
      />
      <SearchIcon
        size={16}
        aria-hidden="true"
        class="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-ink-muted"
      />
      {searchTerm && (
        <button
          type="button"
          onClick={clearSearch}
          aria-label="Limpiar búsqueda"
          class="absolute right-8 top-1/2 -translate-y-1/2 rounded-md p-1 text-ink-muted transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
        >
          <X size={14} aria-hidden="true" />
        </button>
      )}
    </div>
  )
}
