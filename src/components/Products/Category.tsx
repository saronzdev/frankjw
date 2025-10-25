import { ProductCard } from './ProductCard'
import { CategoryHeader } from './CategoryHeader'
import { products } from '@/shared/signals'
import styles from '@/styles/Category.module.css'
import { CATEGORIES } from '@/shared/utils'

interface Props {
  category: string
}

interface CategoryType {
  title: string
  description: string
  img: string
}

export function Category({ category }: Props) {
  const categoryData = CATEGORIES.find(
    (cat) => cat.title.toLowerCase().trim() === category.toLowerCase().trim()
  ) as CategoryType

  const matchProducts = products.value.filter((p) => p.category.toLowerCase().trim() === category.toLowerCase().trim())

  return (
    <section className={styles.section}>
      <CategoryHeader title={categoryData.title} description={categoryData?.description} image={categoryData.img} />
      <div className={styles.grid}>
        {matchProducts.map((p) => (
          <ProductCard key={p.id} data={p} />
        ))}
      </div>
    </section>
  )
}
