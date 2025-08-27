import { useState, useEffect, useRef } from 'preact/hooks'
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
  const selectedRef = useRef<HTMLElement>(null)

  const scrollToCategory = () => {
    if (selectedCategory && selectedRef.current) {
      requestAnimationFrame(() => {
        const headerHeight = document.getElementById('header')?.offsetHeight || 0
        const elementTop = selectedRef.current!.offsetTop - headerHeight - 20
        window.scrollTo({ top: elementTop, behavior: 'smooth' })
      })
    }
  }

  useEffect(() => {
    const category = new URLSearchParams(window.location.search).get('category') || ''
    setSelectedCategory(category)
  }, [location])

  useEffect(() => {
    const checkUrl = () => {
      const category = new URLSearchParams(window.location.search).get('category') || ''
      if (category !== selectedCategory) {
        setSelectedCategory(category)
      }
    }

    const interval = setInterval(checkUrl, 50)
    return () => clearInterval(interval)
  }, [selectedCategory])

  useEffect(() => {
    scrollToCategory()
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
          {cats.value.map((category) => (
            <Category
              key={category}
              category={category}
              isSelected={selectedCategory === category}
              ref={selectedCategory === category ? selectedRef : undefined}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
