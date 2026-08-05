import { useMemo, useState } from 'preact/hooks'
import { ProductForm } from '@/components/products/ProductForm'
import { ProductCard } from '@/components/products/ProductCard'
import { Search } from '@/components/products/Search'
import { SortSelect } from '@/components/products/SortSelect'
import { ProductFilters } from '@/components/products/ProductFilters'
import type { ProductIn, ProductType } from '@/types'
import { createProduct, deleteProduct, updateProduct } from '@/shared/fetching'
import { getErrorMessage, filterAndSortProducts } from '@/shared/utils'
import { LoadingCard } from '@/components/products/LoadingCard'
import { ErrorCard } from '@/components/products/ErrorCard'
import { NoProducts } from '@/components/products/NoProducts'
import { Toaster, toast } from 'sonner'
import { products, isAdmin, refreshProducts, error, loading } from '@/shared/signals'
import filterIcon from '@/assets/filter.svg'
import styles from '@/styles/Dashboard.module.css'
import productsStyles from '@/styles/Products.module.css'

export function Dashboard() {
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
      const { ok, error: err } = await updateProduct(editingProduct.id, data)
      setShowForm(!ok)
      if (!ok) return toast.error(getErrorMessage(err ?? 1))
      await refreshProducts()
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
  if (error.value > 0 && error.value !== 1101) {
    return <ErrorCard message={getErrorMessage(error.value)} />
  }

  const hasProducts = products.value.length > 0

  return (
    <>
      <div className={styles.container}>
        <Toaster richColors position="bottom-center" />
        <div className={styles.header}>
          <button onClick={handleCreateProduct} className={styles.newProductButton} aria-label="Agregar un producto">
            + Nuevo Producto
          </button>
          {hasProducts && (
            <Search
              searchTerm={searchTerm}
              handlerSearch={setSearchTerm}
              setSearchTerm={setSearchTerm}
              placeholder="Buscar por ID"
            />
          )}
        </div>

        {hasProducts && (
          <div className={productsStyles.sortContainer}>
            <SortSelect value={sortBy} onChange={setSortBy} />
            <button className={productsStyles.filterButton} onClick={() => setFiltersOpen(true)}>
              <img src={filterIcon} alt="Icono de filtros" height={18} width={18} />
              Filtros
            </button>
          </div>
        )}

        <div className={styles.content}>
          {filteredProducts.length === 0 ? (
            <NoProducts searchTerm={searchTerm} hasProducts={hasProducts} />
          ) : (
            <div className={styles.grid}>
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  data={product}
                  onEdit={handleEditProduct}
                  onDelete={handleDeleteProduct}
                  editable={true}
                />
              ))}
            </div>
          )}
        </div>

        {/* Sidebar de filtros */}
        {filtersOpen && (
          <>
            <div className={productsStyles.overlay} onClick={() => setFiltersOpen(false)} />
            <div className={productsStyles.sidebar}>
              <div className={productsStyles.sidebarHeader}>
                <h2 className={productsStyles.sidebarTitle}>Filtros</h2>
                <button className={productsStyles.closeButton} onClick={() => setFiltersOpen(false)}>
                  ✕
                </button>
              </div>
              <div className={productsStyles.sidebarContent}>
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

        {showForm && <ProductForm product={editingProduct} onSave={handleSaveProduct} onCancel={handleCancelForm} />}
      </div>
    </>
  )
}