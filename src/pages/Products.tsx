import { cats, error, loading } from '@/shared/signals'
import { Category } from '@/components/Products/Category'
import { ErrorCard } from '@/components/Products/ErrorCard'
import { LoadingCard } from '@/components/Products/LoadigCard'
import { getErrorMessage } from '@/shared/utils'
import { NoProducts } from '@/components/Products/NoProducts'
import styles from '@/styles/Products.module.css'

export function Products() {
  if (loading.value) return <LoadingCard />
  if (error.value > 0) {
    if (error.value === 1101) return <NoProducts hasProducts={false} />
    return <ErrorCard message={getErrorMessage(error.value)} />
  }

  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <div className={styles.categoriesContainer}>
          {cats.value.map((item) => (
            <Category key={item} category={item} />
          ))}
        </div>
      </section>
    </div>
  )
}
