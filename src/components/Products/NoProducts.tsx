import styles from '@/styles/NoProducts.module.css'

type Props = {
  searchTerm?: string
  hasProducts?: boolean
}

export function NoProducts({ searchTerm, hasProducts = false }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>{searchTerm ? '🔍' : '📦'}</div>
      <h3 className={styles.title}>
        {searchTerm
          ? 'No se encontraron productos'
          : hasProducts
          ? 'No hay productos que coincidan'
          : 'No hay productos disponibles'}
      </h3>
      <p className={styles.description}>
        {searchTerm
          ? `No se encontraron productos que coincidan con "${searchTerm}". Intenta con otros términos de búsqueda.`
          : hasProducts
          ? 'Los filtros aplicados no coinciden con ningún producto. Intenta con otros criterios.'
          : 'Parece que aún no hay productos en el catálogo.'}
      </p>
    </div>
  )
}
