import { useState, useEffect } from 'preact/hooks'
import { ProductForm } from '@/components/Products/ProductForm'
import { ProductCard } from '@/components/Products/ProductCard'
import { Search } from '@/components/Products/Search'
import { type ProductIn, type ProductType } from '@/shared/types'
import { createProduct, deleteProduct, updateProduct } from '@/shared/fetching'
import { getErrorMessage } from '@/shared/utils'
import { LoadingCard } from '@/components/Products/LoadigCard'
import { ErrorCard } from '@/components/Products/ErrorCard'
import { NotProducts } from '@/components/Products/NotProducts'
import { Toaster, toast } from 'sonner'
import { useLocation } from 'wouter'
import { products, isAdmin, refreshProducts, error, loading } from '@/shared/signals'

export function Dashboard() {
  const [_, setLocation] = useLocation()

  useEffect(() => {
    if (isAdmin.value === false) setLocation('/login')
  }, [isAdmin.value, setLocation])

  if (isAdmin.value === null) return <LoadingCard />

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
    if (!term.trim()) {
      setFilteredProducts(products.value)
      setIsSearching(false)
      return
    }

    setIsSearching(true)
    const searchTerm = term.toLowerCase().trim()
    const data = products.value.filter((product) => {
      return product.name.toLowerCase().includes(searchTerm) || product.productId.toLowerCase().includes(searchTerm)
    })
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

  if (loading.value && products.value.length === 0) return <LoadingCard />
  if (error.value > 0 && error.value !== 1101) {
    return <ErrorCard message={getErrorMessage(error.value)} />
  }

  return (
    <>
      <div className="min-h-screen">
        <Toaster richColors position="bottom-center" />
        <div className="flex flex-col gap-4 items-center justify-center m-6">
          <button
            onClick={handleCreateProduct}
            className="w-fit bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium"
          >
            + Nuevo Producto
          </button>
          {products.value.length > 0 && (
            <Search
              searchTerm={searchTerm}
              handlerSearch={handlerSearch}
              setSearchTerm={setSearchTerm}
              placeholder="Bucar por ID o Nombre"
            />
          )}
        </div>
        <div className="m-4">
          {isSearching ? (
            <div className="flex justify-center items-center p-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <NotProducts searchTerm={searchTerm} hasProducts={products.value.length > 0} />
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
