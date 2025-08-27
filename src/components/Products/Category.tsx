import { forwardRef } from 'preact/compat'
import { ProductCard } from './ProductCard'
import { products } from '@/shared/signals'
import styles from '@/styles/Category.module.css'

interface Props {
  category: string
  isSelected?: boolean
}

export const Category = forwardRef<HTMLElement, Props>(({ category, isSelected = false }, ref) => {
  const matchProducts = products.value.filter((p) => p.category.toLowerCase().trim() === category.toLowerCase().trim())

  return (
    <section ref={ref} className={`${styles.section} ${isSelected ? styles.selected : ''}`}>
      <div className={styles.header}>
        <h1 className={styles.title}>{category}</h1>
      </div>
      <div className={styles.grid}>
        {matchProducts.map((p) => (
          <ProductCard key={p.id} data={p} />
        ))}
      </div>
    </section>
  )
})
