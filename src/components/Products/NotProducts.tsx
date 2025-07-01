type Props = {
  searchTerm?: string
}

export function NotProducts(props: Props) {
  return (
    <div className="text-center py-12">
      <div className="text-6xl mb-4">📦</div>
      <h3 className="text-xl font-medium text-black mb-2">No hay productos</h3>
      <p className="text-gray-600 mb-4">
        {props.searchTerm
          ? 'No se encontraron productos con los filtros aplicados'
          : 'Comienza agregando tu primer producto'}
      </p>
    </div>
  )
}
