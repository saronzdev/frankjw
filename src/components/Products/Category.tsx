import { ProductCard } from './ProductCard'
// import { capitalize } from '@/shared/utils'
import { products } from '@/shared/signals'
import styles from '@/styles/Category.module.css'

export function Category({ category }: { category: string }) {
  const matchProducts = products.value.filter((p) => p.category.toLowerCase().trim() === category.toLowerCase().trim())
  return (
    <section className={styles.section}>
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
}
