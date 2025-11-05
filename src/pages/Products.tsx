import { useRoute } from 'wouter'
import { cats, error, loading } from '@/shared/signals'
import { Category } from '@/components/Products/Category'
import { ErrorCard } from '@/components/Products/ErrorCard'
import { LoadingCard } from '@/components/Products/LoadigCard'
import { getErrorMessage, unslugify } from '@/shared/utils'
import { NoProducts } from '@/components/Products/NoProducts'
import styles from '@/styles/Products.module.css'

export function Products() {
  const [_, params] = useRoute('/products/:category?')
  const categoryParam = params?.category || ''

  // Si hay categoría en la URL, buscar su nombre canónico; si no, mostrar todas
  const categories = categoryParam ? [unslugify(categoryParam) || categoryParam].filter(Boolean) : cats.value

  if (loading.value) return <LoadingCard />
  if (error.value > 0) {
    if (error.value === 1101) return <NoProducts hasProducts={false} />
    return <ErrorCard message={getErrorMessage(error.value)} />
  }

  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <div className={styles.categoriesContainer}>
          {categories.map((category) => (
            <Category key={category} category={category} />
          ))}
        </div>
      </section>
    </div>
  )
}
