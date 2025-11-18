import { useState, useEffect } from 'preact/hooks'
import { ProductForm } from '@/components/products/ProductForm'
import { ProductCard } from '@/components/products/ProductCard'
import { Search } from '@/components/products/Search'
import type { ProductIn, ProductType } from '@/types'
import { createProduct, deleteProduct, updateProduct } from '@/shared/fetching'
import { getErrorMessage } from '@/shared/utils'
import { LoadingCard } from '@/components/products/LoadigCard'
import { ErrorCard } from '@/components/products/ErrorCard'
import { NoProducts } from '@/components/products/NoProducts'
import { Toaster, toast } from 'sonner'
import { products, isAdmin, refreshProducts, error, loading } from '@/shared/signals'
import styles from '@/styles/Dashboard.module.css'

export function Dashboard() {
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<ProductType>()
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredProducts, setFilteredProducts] = useState(products.value)
  const [isSearching, setIsSearching] = useState(false)

  useEffect(() => {
    setFilteredProducts(products.value)
  }, [products.value])

  const handlerSearch = (term: string) => {
    setSearchTerm(term)
    const trimmed = term.trim().toLowerCase()
    if (!trimmed) {
      setFilteredProducts(products.value)
      setIsSearching(false)
      return
    }

    setIsSearching(true)
    const data = products.value.filter((product) => product.productId.toLowerCase().includes(trimmed))
    setFilteredProducts(data)
    setIsSearching(false)
  }

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
      const { ok, error } = (await updateProduct(editingProduct.id, data)) as { ok: boolean; error: number }
      setShowForm(!ok)
      if (!ok) return toast.error(getErrorMessage(error))
      await refreshProducts()
      setEditingProduct(undefined)
      toast.success('Se ha actualizado el producto correctamente')
    } else {
      const { ok, error } = (await createProduct(data)) as { ok: boolean; error: number }
      setShowForm(!ok)
      if (!ok) return toast.error(getErrorMessage(error))
      await refreshProducts()
      toast.success('Se ha añadido el producto correctamente')
    }
  }

  const handleDeleteProduct = async (id: number) => {
    const { ok, error } = (await deleteProduct(id)) as { ok: boolean; error: number }
    if (!ok) return toast.error(getErrorMessage(error))
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

  return (
    <>
      <div className={styles.container}>
        <Toaster richColors position="bottom-center" />
        <div className={styles.header}>
          <button onClick={handleCreateProduct} className={styles.newProductButton} aria-label="Agregar un producto">
            + Nuevo Producto
          </button>
          {products.value.length > 0 && (
            <Search
              searchTerm={searchTerm}
              handlerSearch={handlerSearch}
              setSearchTerm={setSearchTerm}
              placeholder="Buscar por ID"
            />
          )}
        </div>
        <div className={styles.content}>
          {isSearching ? (
            <div className={styles.searchingContainer}>
              <div className={styles.searchingSpinner}></div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <NoProducts searchTerm={searchTerm} hasProducts={products.value.length > 0} />
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

        {showForm && <ProductForm product={editingProduct} onSave={handleSaveProduct} onCancel={handleCancelForm} />}
      </div>
    </>
  )
}
