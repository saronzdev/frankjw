import { useState } from 'preact/hooks'
import { lazy, Suspense } from 'preact/compat'
import { useRoute, Link } from 'wouter'
import { cats, products, error, loading } from '@/shared/signals'
import { CategoryHeader } from '@/components/products/CategoryHeader'
import { ProductGrid } from '@/components/products/ProductGrid'
import { FiltersToolbar } from '@/components/products/FiltersToolbar'
import { FiltersDrawer } from '@/components/products/FiltersDrawer'
import { NoProducts } from '@/components/products/NoProducts'
import { ErrorCard } from '@/components/products/ErrorCard'
import { LoadingCard } from '@/components/products/LoadingCard'
import {
  getErrorMessage,
  findCategory,
  filterAndSortProducts,
  slugify,
  normalize,
  HIDDEN_CATEGORY
} from '@/shared/utils'

const NotFound = lazy(() => import('./NotFound').then((m) => ({ default: m.NotFound })))

export function Products() {
  const [_, params] = useRoute('/products/:category?')
  const categoryParam = params?.category || ''
  const [sortBy, setSortBy] = useState('default')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 0])
  const [selectedKarats, setSelectedKarats] = useState<number[]>([])
  const [onSale, setOnSale] = useState(false)
  const [filtersOpen, setFiltersOpen] = useState(false)

  const handleResetFilters = () => {
    setPriceRange([0, 0])
    setSelectedKarats([])
    setOnSale(false)
  }

  const closeFilters = () => setFiltersOpen(false)

  if (loading.value) return <LoadingCard />
  if (error.value > 0) return <ErrorCard message={getErrorMessage(error.value)} />

  const category = categoryParam ? findCategory(categoryParam) : undefined
  if (categoryParam && !category) {
    return (
      <Suspense fallback={<LoadingCard />}>
        <NotFound />
      </Suspense>
    )
  }

  const baseList = category
    ? products.value.filter((p) => p.category.toLowerCase().trim() === category.title.toLowerCase().trim())
    : products.value.filter((p) => p.category !== HIDDEN_CATEGORY)

  const filtered = filterAndSortProducts(baseList, { sortBy, priceRange, selectedKarats, onSale })

  return (
    <div class="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 md:py-10">
      {category ? (
        <CategoryHeader title={category.title} description={category.description} image={category.img} />
      ) : (
        <header class="mx-auto flex max-w-2xl flex-col items-center gap-2 text-center">
          <h1 class="font-display text-3xl font-semibold uppercase tracking-[0.05em] text-ink md:text-4xl">
            Nuestra Colección
          </h1>
          <p class="text-sm text-ink-muted md:text-[0.95rem]">
            Piezas de oro y plata elaboradas a mano, listas para acompañar cada momento.
          </p>
        </header>
      )}

      {!category && (
        <nav aria-label="Categorías" class="flex flex-wrap justify-center gap-2">
          {cats.value.map((cat) => (
            <Link
              key={cat}
              href={`/products/${slugify(cat)}`}
              class="rounded-full border border-line bg-surface px-4 py-1.5 text-sm text-ink-soft transition-colors hover:border-gold hover:bg-gold-soft/60 hover:text-gold-deep"
            >
              {normalize(cat)}
            </Link>
          ))}
        </nav>
      )}

      {filtered.length > 0 ? (
        <>
          <div class="sticky top-16 z-30 bg-bg/95 py-2 backdrop-blur-sm">
            <FiltersToolbar sortValue={sortBy} onSortChange={setSortBy} onOpenFilters={() => setFiltersOpen(true)} />
          </div>
          <ProductGrid products={filtered} />
        </>
      ) : (
        <NoProducts hasProducts={baseList.length > 0} />
      )}

      <FiltersDrawer
        open={filtersOpen}
        onClose={closeFilters}
        priceRange={priceRange}
        selectedKarats={selectedKarats}
        onSale={onSale}
        onPriceChange={setPriceRange}
        onKaratsChange={setSelectedKarats}
        onSaleChange={setOnSale}
        onReset={handleResetFilters}
      />
    </div>
  )
}
