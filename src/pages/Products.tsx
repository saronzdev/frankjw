import { useState, useEffect, useRef } from 'preact/hooks'
import { useRoute } from 'wouter'
import { cats, error, loading } from '@/shared/signals'
import { Category } from '@/components/products/Category'
import { SortSelect } from '@/components/products/SortSelect'
import { ProductFilters } from '@/components/products/ProductFilters'
import { ErrorCard } from '@/components/products/ErrorCard'
import { LoadingCard } from '@/components/products/LoadingCard'
import { getErrorMessage, unslugify } from '@/shared/utils'
import { NoProducts } from '@/components/products/NoProducts'
import filterIcon from '@/assets/filter.svg'
import styles from '@/styles/Products.module.css'

export function Products() {
  const [_, params] = useRoute('/products/:category?')
  const categoryParam = params?.category || ''
  const [sortBy, setSortBy] = useState('default')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 0])
  const [selectedKarats, setSelectedKarats] = useState<number[]>([])
  const [onSale, setOnSale] = useState(false)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const sortContainerRef = useRef<HTMLDivElement>(null)

  const handleResetFilters = () => {
    setPriceRange([0, 0])
    setSelectedKarats([])
    setOnSale(false)
  }

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
          <button className={styles.filterButton} onClick={() => setFiltersOpen(true)}>
            <img src={filterIcon} alt="Filter icon" height={18} width={18} />
            Filtros
          </button>
        </div>
      )}

      <section className={styles.section}>
        <div className={styles.categoriesContainer}>
          {categories.map((category) => (
            <Category
              key={category}
              category={category}
              sortBy={sortBy}
              priceRange={priceRange}
              selectedKarats={selectedKarats}
              onSale={onSale}
            />
          ))}
        </div>
      </section>

      {/* Sidebar overlay */}
      {filtersOpen && (
        <>
          <div className={styles.overlay} onClick={() => setFiltersOpen(false)} />
          <div className={styles.sidebar}>
            <div className={styles.sidebarHeader}>
              <h2 className={styles.sidebarTitle}>Filtros</h2>
              <button className={styles.closeButton} onClick={() => setFiltersOpen(false)}>
                ✕
              </button>
            </div>
            <div className={styles.sidebarContent}>
              <ProductFilters
                priceRange={priceRange}
                selectedKarats={selectedKarats}
                onSale={onSale}
                onPriceChange={setPriceRange}
                onKaratsChange={setSelectedKarats}
                onSaleChange={setOnSale}
                onReset={handleResetFilters}
              />
            </div>
          </div>
        </>
      )}
    </div>
  )
}
