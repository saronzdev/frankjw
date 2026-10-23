import { useMemo, useState } from 'preact/hooks'
import { Plus } from 'lucide-preact'
import { ProductForm } from '@/components/products/ProductForm'
import { ProductGrid } from '@/components/products/ProductGrid'
import { Search } from '@/components/products/Search'
import { FiltersToolbar } from '@/components/products/FiltersToolbar'
import { FiltersDrawer } from '@/components/products/FiltersDrawer'
import type { ProductIn, ProductType } from '@/types'
import { createProduct, deleteProduct, updateProduct } from '@/shared/fetching'
import { deleteImage, isStorageUrl } from '@/shared/storage'
import { getErrorMessage, filterAndSortProducts } from '@/shared/utils'
import { usePageMeta } from '@/shared/meta'
import { LoadingCard } from '@/components/products/LoadingCard'
import { ErrorCard } from '@/components/products/ErrorCard'
import { NoProducts } from '@/components/products/NoProducts'
import { Toaster, toast } from 'sonner'
import { products, isAdmin, refreshProducts, error, loading } from '@/shared/signals'
import { Button } from '@/ui/Button'

export function Dashboard() {
  usePageMeta({ title: 'Panel de administración | Frank Joyería', path: '/dashboard', noIndex: true })
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<ProductType>()
  const [searchTerm, setSearchTerm] = useState('')
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

  const filteredProducts = useMemo(() => {
    const trimmed = searchTerm.trim().toLowerCase()
    const bySearch = trimmed ? products.value.filter((p) => p.productId.toLowerCase().includes(trimmed)) : products.value
    return filterAndSortProducts(bySearch, { sortBy, priceRange, selectedKarats, onSale })
  }, [products.value, searchTerm, sortBy, priceRange, selectedKarats, onSale])

  const handleCreateProduct = () => {
    setEditingProduct(undefined)
    setShowForm(true)
  }

  const handleEditProduct = (product: ProductType) => {
    setEditingProduct(product)
    setShowForm(true)
  }

  const handleSaveProduct = async (data: ProductIn) => {
    if (editingProduct) {
      const previousPictures = editingProduct.pictures ?? []
      const { ok, error: err } = await updateProduct(editingProduct.id, data)
      setShowForm(!ok)
      if (!ok) return toast.error(getErrorMessage(err ?? 1))
      await refreshProducts()
      const removed = previousPictures.filter((url) => isStorageUrl(url) && !(data.pictures ?? []).includes(url))
      await Promise.allSettled(removed.map((url) => deleteImage(url)))
      setEditingProduct(undefined)
      toast.success('Se ha actualizado el producto correctamente')
    } else {
      const { ok, error: err } = await createProduct(data)
      setShowForm(!ok)
      if (!ok) return toast.error(getErrorMessage(err ?? 1))
      await refreshProducts()
      toast.success('Se ha añadido el producto correctamente')
    }
  }

  const handleDeleteProduct = async (id: number) => {
    const { ok, error: err } = await deleteProduct(id)
    if (!ok) return toast.error(getErrorMessage(err ?? 1))
    await refreshProducts()
    toast.success('Se ha eliminado el producto correctamente')
  }

  const handleCancelForm = () => {
    setShowForm(false)
    setEditingProduct(undefined)
  }

  if (isAdmin.value === null) return <LoadingCard />
  if (loading.value && products.value.length === 0) return <LoadingCard />
  if (error.value > 0) {
    return <ErrorCard message={getErrorMessage(error.value)} />
  }

  const hasProducts = products.value.length > 0

  return (
    <>
      <div class="min-h-dvh px-4 py-6 md:px-6 md:py-8">
        <Toaster richColors position="bottom-center" />
        <div class="mx-auto flex max-w-7xl flex-col gap-4">
          <div class="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
            <Button onClick={handleCreateProduct} aria-label="Agregar un producto">
              <Plus size={16} aria-hidden="true" />
              Nuevo Producto
            </Button>
            {hasProducts && (
              <div class="w-full sm:w-64">
                <Search
                  searchTerm={searchTerm}
                  handlerSearch={setSearchTerm}
                  setSearchTerm={setSearchTerm}
                  placeholder="Buscar por ID"
                />
              </div>
            )}
          </div>

          {hasProducts && (
            <FiltersToolbar sortValue={sortBy} onSortChange={setSortBy} onOpenFilters={() => setFiltersOpen(true)} />
          )}

          <div class="py-4">
            {filteredProducts.length === 0 ? (
              <NoProducts searchTerm={searchTerm} hasProducts={hasProducts} />
            ) : (
              <ProductGrid
                products={filteredProducts}
                editable={true}
                onEdit={handleEditProduct}
                onDelete={handleDeleteProduct}
              />
            )}
          </div>

          <FiltersDrawer
            open={filtersOpen}
            onClose={() => setFiltersOpen(false)}
            priceRange={priceRange}
            selectedKarats={selectedKarats}
            onSale={onSale}
            onPriceChange={setPriceRange}
            onKaratsChange={setSelectedKarats}
            onSaleChange={setOnSale}
            onReset={handleResetFilters}
          />

          {showForm && <ProductForm product={editingProduct} onSave={handleSaveProduct} onCancel={handleCancelForm} />}
        </div>
      </div>
    </>
  )
}