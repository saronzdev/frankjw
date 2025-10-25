import { useState, useEffect } from 'preact/hooks'
import { useLocation } from 'wouter'
import { cats, error, loading } from '@/shared/signals'
import { Category } from '@/components/Products/Category'
import { ErrorCard } from '@/components/Products/ErrorCard'
import { LoadingCard } from '@/components/Products/LoadigCard'
import { getErrorMessage } from '@/shared/utils'
import { NoProducts } from '@/components/Products/NoProducts'
import styles from '@/styles/Products.module.css'

export function Products() {
  const [location] = useLocation()
  const [selectedCategory, setSelectedCategory] = useState('')
  const [categories, setCategories] = useState<string[]>([])


  useEffect(() => {
    const category = new URLSearchParams(window.location.search).get('category') || ''
    if (category) setSelectedCategory(category)
  }, [location])

  useEffect(() => {
    if (selectedCategory) setCategories(cats.value.filter(c => c === selectedCategory))
    else setCategories(cats.value)
  }, [selectedCategory])  

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
            <Category
              key={category}
              category={category}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
