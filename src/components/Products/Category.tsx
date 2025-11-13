import { ProductCard } from './ProductCard'
import { CategoryHeader } from './CategoryHeader'
import { products } from '@/shared/signals'
import styles from '@/styles/Category.module.css'
import { CATEGORIES, slugify } from '@/shared/utils'

interface Props {
  category: string
  sortBy?: string
}

export function Category({ category, sortBy = 'default' }: Props) {
  let categoryData = CATEGORIES.find((cat) => cat.title.toLowerCase().trim() === category.toLowerCase().trim())

  if (!categoryData) {
    const categorySlug = slugify(category)
    categoryData = CATEGORIES.find((cat) => slugify(cat.title) === categorySlug)
  }

  if (!categoryData) {
    console.warn(`Category not found: ${category}`)
    return null
  }

  let matchProducts = products.value.filter((p) => p.category.toLowerCase().trim() === category.toLowerCase().trim())

  if (sortBy === 'name') {
    matchProducts = [...matchProducts].sort((a, b) => a.description.localeCompare(b.description))
  } else if (sortBy === 'price-asc') {
    matchProducts = [...matchProducts].sort((a, b) => a.price - b.price)
  } else if (sortBy === 'price-desc') {
    matchProducts = [...matchProducts].sort((a, b) => b.price - a.price)
  } else if (sortBy === 'weight') {
    matchProducts = [...matchProducts].sort((a, b) => {
      const weightA = Number(a.weight)
      const weightB = Number(b.weight)

      if (isNaN(weightA) && isNaN(weightB)) return 0
      if (isNaN(weightA)) return 1
      if (isNaN(weightB)) return -1

      return weightB - weightA
    })
  } else {
    matchProducts = [...matchProducts].sort((a, b) => b.createdAt - a.createdAt)
  }

  return (
    <section className={styles.section}>
      <CategoryHeader title={categoryData.title} description={categoryData.description} image={categoryData.img} />

      <div className={styles.grid}>
        {matchProducts.map((p, index) => (
          <ProductCard key={`${sortBy}-${p.id}-${index}`} data={p} allProducts={matchProducts} productIndex={index} />
        ))}
      </div>
    </section>
  )
}
