import { useEffect, useState } from 'preact/hooks'
import { lazy, Suspense } from 'preact/compat'
import { useLocation, useRoute, Link } from 'wouter'
import { cats, products, error, loading, refreshProducts } from '@/shared/signals'
import { CategoryHeader } from '@/components/products/CategoryHeader'
import { ProductGrid, ProductGridSkeleton } from '@/components/products/ProductGrid'
import { FiltersToolbar } from '@/components/products/FiltersToolbar'
import { FiltersDrawer } from '@/components/products/FiltersDrawer'
import { NoProducts } from '@/components/products/NoProducts'
import { ErrorCard } from '@/components/products/ErrorCard'
import { LoadingCard } from '@/components/products/LoadingCard'
import type { ProductType } from '@/types'
import {
  getErrorMessage,
  findCategory,
  filterAndSortProducts,
  slugify,
  normalize,
  HIDDEN_CATEGORY
} from '@/shared/utils'
import { usePageMeta } from '@/shared/meta'
import { catalogPage, categoryPage } from '@/seo/routes'
import { findProductBySlug, productFallbackPage, productPath, productSeo } from '@/seo/product'

const NotFound = lazy(() => import('./NotFound').then((m) => ({ default: m.NotFound })))
const ProductPopup = lazy(() =>
  import('@/components/products/ProductPopup').then((m) => ({ default: m.ProductPopup }))
)

export function Products() {
  const [, setLocation] = useLocation()
  const [_, params] = useRoute('/products/:category?/:slug?')
  const categoryParam = params?.category || ''
  const productSlug = params?.slug || ''
  const category = categoryParam ? findCategory(categoryParam) : undefined
  const [sortBy, setSortBy] = useState('default')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 0])
  const [selectedKarats, setSelectedKarats] = useState<number[]>([])
  const [onSale, setOnSale] = useState(false)
  const [preciousStones, setPreciousStones] = useState(false)
  const [filtersOpen, setFiltersOpen] = useState(false)

  const catalogLoading = loading.value && products.value.length === 0
  const resolved = productSlug && category ? findProductBySlug(products.value, categoryParam, productSlug) : null
  const canonicalPath = resolved?.needsRedirect ? resolved.canonicalPath : ''

  useEffect(() => {
    if (canonicalPath) setLocation(canonicalPath, { replace: true })
  }, [canonicalPath, setLocation])

  usePageMeta(
    resolved
      ? productSeo(resolved.product) ?? productFallbackPage(categoryParam, productSlug)
      : productSlug && category
        ? productFallbackPage(categoryParam, productSlug)
        : category
          ? { ...categoryPage(category), noIndex: category.title === HIDDEN_CATEGORY }
          : categoryParam
            ? { ...catalogPage(), path: `/products/${categoryParam}`, noIndex: true }
            : catalogPage()
  )

  const handleResetFilters = () => {
    setPriceRange([0, 0])
    setSelectedKarats([])
    setOnSale(false)
    setPreciousStones(false)
  }

  const closeFilters = () => setFiltersOpen(false)

  if (categoryParam && !category) {
    return (
      <Suspense fallback={<LoadingCard />}>
        <NotFound />
      </Suspense>
    )
  }

  if (productSlug && !resolved && !catalogLoading && error.value === 0) {
    return (
      <Suspense fallback={<LoadingCard />}>
        <NotFound />
      </Suspense>
    )
  }

  const baseList = category
    ? products.value.filter((p) => p.category.toLowerCase().trim() === category.title.toLowerCase().trim())
    : products.value.filter((p) => p.category !== HIDDEN_CATEGORY)

  const filtered = filterAndSortProducts(baseList, { sortBy, priceRange, selectedKarats, onSale, preciousStones })

  const categoryPath = category ? `/products/${slugify(category.title)}` : '/products'
  const selectedProduct = resolved?.product
  const selectedIndex = selectedProduct ? filtered.findIndex((product) => product.id === selectedProduct.id) : -1

  const openProduct = (product: ProductType) => {
    const path = productPath(product)
    if (path) setLocation(path)
  }

  const closeProduct = () => setLocation(categoryPath, { replace: true })

  const navigateProduct = (index: number) => {
    const product = filtered[index]
    const path = product ? productPath(product) : null
    if (path) setLocation(path, { replace: true })
  }

  return (
    <div class="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-8 md:py-10">
      {category ? (
        <CategoryHeader title={category.title} description={category.description} image={category.img} />
      ) : (
        <header class="mx-auto flex max-w-2xl flex-col items-center gap-2 text-center">
          <h1 class="font-display text-3xl font-semibold uppercase tracking-[0.05em] text-ink md:text-4xl">
            Nuestra Colección
          </h1>
          <p class="text-sm text-ink-muted md:text-[0.95rem]">
            Piezas de oro elaboradas a mano, listas para acompañar cada momento.
          </p>
        </header>
      )}

      {!category && (
        <nav aria-label="Categorías" class="flex min-h-9 flex-wrap justify-center gap-2">
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

      {error.value > 0 ? (
        <ErrorCard message={getErrorMessage(error.value)} onRetry={() => refreshProducts()} />
      ) : catalogLoading ? (
        <ProductGridSkeleton />
      ) : filtered.length > 0 ? (
        <>
          <div class="sticky top-16 z-30 min-h-[53px] bg-bg/95 backdrop-blur-sm">
            <FiltersToolbar sortValue={sortBy} onSortChange={setSortBy} onOpenFilters={() => setFiltersOpen(true)} />
          </div>
          <ProductGrid products={filtered} onOpen={openProduct} />
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
        preciousStones={preciousStones}
        onPriceChange={setPriceRange}
        onKaratsChange={setSelectedKarats}
        onSaleChange={setOnSale}
        onPreciousStonesChange={setPreciousStones}
        onReset={handleResetFilters}
      />

      {selectedProduct && (
        <Suspense fallback={null}>
          <ProductPopup
            key={selectedProduct.id}
            product={selectedProduct}
            onClose={closeProduct}
            allProducts={filtered}
            currentIndex={selectedIndex >= 0 ? selectedIndex : 0}
            onNavigate={navigateProduct}
          />
        </Suspense>
      )}
    </div>
  )
}
