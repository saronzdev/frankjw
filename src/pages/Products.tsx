import { useState } from 'preact/hooks'
import { useRoute } from 'wouter'
import { cats, error, loading } from '@/shared/signals'
import { Category } from '@/components/Products/Category'
import { SortSelect } from '@/components/Products/SortSelect'
import { ErrorCard } from '@/components/Products/ErrorCard'
import { LoadingCard } from '@/components/Products/LoadigCard'
import { getErrorMessage, unslugify, CATEGORIES, slugify } from '@/shared/utils'
import { NoProducts } from '@/components/Products/NoProducts'
import styles from '@/styles/Products.module.css'

export function Products() {
  const [_, params] = useRoute('/products/:category?')
  const categoryParam = params?.category || ''
  const [sortBy, setSortBy] = useState('default')

  const rawCategories = categoryParam ? [unslugify(categoryParam) || categoryParam].filter(Boolean) : cats.value

  const categories = rawCategories
    .map((cat) => {
      const categoryMeta = CATEGORIES.find(
        (c) => slugify(c.title) === slugify(cat) || c.title.toLowerCase().trim() === cat.toLowerCase().trim()
      )
      return {
        name: cat,
        order: categoryMeta?.order ?? 999
      }
    })
    .sort((a, b) => a.order - b.order)
    .map((c) => c.name)

  if (loading.value) return <LoadingCard />
  if (error.value > 0) {
    if (error.value === 1101) return <NoProducts hasProducts={false} />
    return <ErrorCard message={getErrorMessage(error.value)} />
  }

  return (
    <div className={styles.container}>
      {categories.length > 0 && (
        <div className={styles.sortContainer}>
          <SortSelect value={sortBy} onChange={setSortBy} />
        </div>
      )}

      <section className={styles.section}>
        <div className={styles.categoriesContainer}>
          {categories.map((category) => (
            <Category key={category} category={category} sortBy={sortBy} />
          ))}
        </div>
      </section>
    </div>
  )
}
