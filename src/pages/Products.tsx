import { useState, useEffect } from 'preact/hooks'
import { useRoute } from 'wouter'
import { cats, error, loading } from '@/shared/signals'
import { Category } from '@/components/Products/Category'
import { ErrorCard } from '@/components/Products/ErrorCard'
import { LoadingCard } from '@/components/Products/LoadigCard'
import { getErrorMessage, slugify, unslugify } from '@/shared/utils'
import { NoProducts } from '@/components/Products/NoProducts'
import styles from '@/styles/Products.module.css'

interface Props {
  category?: string
}

export function Products(_props: Props) {
  // useRoute nos da acceso al parámetro de ruta (:category)
  const [, params] = useRoute('/products/:category?')
  const categoryParam = params?.category || ''

  const [selectedCategory, setSelectedCategory] = useState('')
  const [categories, setCategories] = useState<string[]>([])

  // Actualizar categoría seleccionada cuando cambie el parámetro de ruta
  useEffect(() => {
    if (categoryParam) {
      // El parámetro viene como slug (/products/dijes)
      setSelectedCategory(categoryParam)
    } else {
      setSelectedCategory('')
    }
  }, [categoryParam])

  useEffect(() => {
    if (selectedCategory) {
      // Preferir obtener el título canónico desde los slugs (unslugify)
      const canonical = unslugify(selectedCategory)
      if (canonical) {
        setCategories([canonical])
        return
      }

      // Fallback: comparar slugificando los nombres de cats (por si vienen en formatos distintos)
      const filteredCats = cats.value.filter((c: string) => slugify(c) === selectedCategory)
      setCategories(filteredCats)
    } else {
      setCategories(cats.value)
    }
  }, [selectedCategory, cats.value])

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
            <Category key={category} category={category} />
          ))}
        </div>
      </section>
    </div>
  )
}
