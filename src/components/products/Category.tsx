import { useMemo } from 'preact/hooks'
import { ProductCard } from './ProductCard'
import { CategoryHeader } from './CategoryHeader'
import { products } from '@/shared/signals'
import styles from '@/styles/Category.module.css'
import { CATEGORIES, slugify, filterAndSortProducts } from '@/shared/utils'

interface Props {
  category: string
  sortBy?: string
  priceRange?: [number, number]
  selectedKarats?: number[]
  onSale?: boolean
}

export function Category({ category, sortBy = 'default', priceRange, selectedKarats, onSale }: Props) {
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

    const filtered = products.value.filter((p) => p.category.toLowerCase().trim() === category.toLowerCase().trim())

    return filterAndSortProducts(filtered, { sortBy, priceRange, selectedKarats, onSale })
  }, [category, categoryData, sortBy, priceRange, selectedKarats, onSale, products.value])

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
