import { useState, useEffect, useRef } from 'preact/hooks'
import { useRoute } from 'wouter'
import { cats, error, loading } from '@/shared/signals'
import { Category } from '@/components/Products/Category'
import { SortSelect } from '@/components/Products/SortSelect'
import { ErrorCard } from '@/components/Products/ErrorCard'
import { LoadingCard } from '@/components/Products/LoadigCard'
import { getErrorMessage, unslugify } from '@/shared/utils'
import { NoProducts } from '@/components/Products/NoProducts'
import styles from '@/styles/Products.module.css'

export function Products() {
  const [_, params] = useRoute('/products/:category?')
  const categoryParam = params?.category || ''
  const [sortBy, setSortBy] = useState('default')
  const sortContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updateStickyTop = () => {
      const header = document.querySelector('header')
      if (header && sortContainerRef.current) {
        const headerHeight = header.offsetHeight
        sortContainerRef.current.style.top = `${headerHeight}px`
      }
    }

    const timer = setTimeout(updateStickyTop, 100)

    let resizeTimer: number
    const debouncedResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(updateStickyTop, 150) as unknown as number
    }

    window.addEventListener('resize', debouncedResize)
    return () => {
      clearTimeout(timer)
      clearTimeout(resizeTimer)
      window.removeEventListener('resize', debouncedResize)
    }
  }, [])

  const categories = categoryParam ? [unslugify(categoryParam) || categoryParam].filter(Boolean) : cats.value

  if (loading.value) return <LoadingCard />
  if (error.value > 0) {
    if (error.value === 1101) return <NoProducts hasProducts={false} />
    return <ErrorCard message={getErrorMessage(error.value)} />
  }

  return (
    <div className={styles.container}>
      {categories.length > 0 && (
        <div ref={sortContainerRef} className={styles.sortContainer}>
          <SortSelect value={sortBy} onChange={setSortBy} />
        </div>
      )}

      <section className={styles.section}>
        <div className={styles.categoriesContainer}>
          {categories.map((category) => (
            <Category key={category} category={category} sortBy={sortBy} />
          ))}
        </div>
      </section>
    </div>
  )
}
