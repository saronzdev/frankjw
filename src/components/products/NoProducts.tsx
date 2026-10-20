import { PackageOpen, SearchX } from 'lucide-preact'

type Props = {
  searchTerm?: string
  hasProducts?: boolean
}

export function NoProducts({ searchTerm, hasProducts = false }: Props) {
  const Icon = searchTerm ? SearchX : PackageOpen

  return (
    <div class="mx-auto flex max-w-md flex-col items-center gap-3 px-4 py-20 text-center">
      <div class="grid h-14 w-14 place-items-center rounded-full bg-surface-2 text-ink-muted">
        <Icon size={26} aria-hidden="true" />
      </div>
      <h3 class="font-display text-xl font-semibold text-ink">
        {searchTerm
          ? 'No se encontraron productos'
          : hasProducts
            ? 'No hay productos que coincidan'
            : 'No hay productos disponibles'}
      </h3>
      <p class="text-sm leading-relaxed text-ink-muted">
        {searchTerm
          ? `No se encontraron productos que coincidan con "${searchTerm}". Intenta con otros términos de búsqueda.`
          : hasProducts
            ? 'Los filtros aplicados no coinciden con ningún producto. Intenta con otros criterios.'
            : 'Parece que aún no hay productos en el catálogo.'}
      </p>
    </div>
  )
}
