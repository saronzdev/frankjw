import { useMemo } from 'preact/hooks'
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
  const categoryData = useMemo(() => {
    let data = CATEGORIES.find((cat) => cat.title.toLowerCase().trim() === category.toLowerCase().trim())

    if (!data) {
      const categorySlug = slugify(category)
      data = CATEGORIES.find((cat) => slugify(cat.title) === categorySlug)
    }

    if (!data) {
      console.warn(`Category not found: ${category}`)
    }

    return data
  }, [category])

  const matchProducts = useMemo(() => {
    if (!categoryData) return []

    let filtered = products.value.filter((p) => p.category.toLowerCase().trim() === category.toLowerCase().trim())

    if (sortBy === 'name') {
      return [...filtered].sort((a, b) => a.description.localeCompare(b.description))
    } else if (sortBy === 'price-asc') {
      return [...filtered].sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price-desc') {
      return [...filtered].sort((a, b) => b.price - a.price)
    } else if (sortBy === 'weight') {
      return [...filtered].sort((a, b) => {
        const weightA = Number(a.weight)
        const weightB = Number(b.weight)

        if (isNaN(weightA) && isNaN(weightB)) return 0
        if (isNaN(weightA)) return 1
        if (isNaN(weightB)) return -1

        return weightB - weightA
      })
    } else {
      return [...filtered].sort((a, b) => b.createdAt - a.createdAt)
    }
  }, [category, sortBy, products.value])

  if (!categoryData) return null

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
