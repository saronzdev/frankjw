type Props = {
  searchTerm?: string
  hasProducts?: boolean
}

export function NotProducts({ searchTerm, hasProducts = false }: Props) {
  return (
    <div className="text-center py-12 px-4">
      <div className="text-6xl mb-4">{searchTerm ? '🔍' : '📦'}</div>
      <h3 className="text-xl font-medium text-black mb-2">
        {searchTerm
          ? 'No se encontraron productos'
          : hasProducts
          ? 'No hay productos que coincidan'
          : 'No hay productos disponibles'}
      </h3>
      <p className="text-gray-600 max-w-md mx-auto">
        {searchTerm
          ? `No se encontraron productos que coincidan con "${searchTerm}". Intenta con otros términos de búsqueda.`
          : hasProducts
          ? 'Los filtros aplicados no coinciden con ningún producto. Intenta con otros criterios.'
          : 'Parece que aún no hay productos en el catálogo.'}
      </p>
    </div>
  )
}
