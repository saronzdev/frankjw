import { ProductCard } from './ProductCard'
import { CategoryHeader } from './CategoryHeader'
import { products } from '@/shared/signals'
import styles from '@/styles/Category.module.css'
import { CATEGORIES, slugify } from '@/shared/utils'

interface Props {
  category: string
}

export function Category({ category }: Props) {
  // Buscar primero por coincidencia exacta (case-insensitive)
  let categoryData = CATEGORIES.find((cat) => cat.title.toLowerCase().trim() === category.toLowerCase().trim())

  // Si no encuentra, intentar matchear por slug
  if (!categoryData) {
    const categorySlug = slugify(category)
    categoryData = CATEGORIES.find((cat) => slugify(cat.title) === categorySlug)
  }

  // Si aún no encuentra, devolver null (componente no renderiza nada)
  if (!categoryData) {
    console.warn(`Category not found: ${category}`)
    return null
  }

  const matchProducts = products.value.filter((p) => p.category.toLowerCase().trim() === category.toLowerCase().trim())

  return (
    <section className={styles.section}>
      <CategoryHeader title={categoryData.title} description={categoryData.description} image={categoryData.img} />
      <div className={styles.grid}>
        {matchProducts.map((p, index) => (
          <ProductCard key={p.id} data={p} allProducts={matchProducts} productIndex={index} />
        ))}
      </div>
    </section>
  )
}
