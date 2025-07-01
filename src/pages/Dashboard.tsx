import { useEffect, useState } from 'preact/hooks'
import { ProductForm } from '../components/Products/ProductForm'
import { ProductCard } from '../components/Products/ProductCard'
import { Search } from '../components/Products/Search'
import { type ProductIn, type ProductType } from '../shared/types'
import { createProduct, deleteProduct, getProducts, updateProduct } from '../shared/fetching'
import { getAuth, getErrorMessage } from '../shared/utils'
import { LoadingCard } from '../components/Products/LoadigCard'
import { ErrorCard } from '../components/Products/ErrorCard'
import { Header } from '../components/Header'
import { NotProducts } from '../components/Products/NotProducts'
import { Toaster, toast } from 'sonner'

export function Dashboard() {
  if (getAuth()?.role !== 'admin') return (window.location.href = '/login')
  const [products, setProducts] = useState<ProductType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(0)
  const [refresh, setRefresh] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<ProductType>()
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredProducts, setFilteredProducts] = useState<ProductType[] | undefined>()

  useEffect(() => {
    getProducts(
      (data) => {
        setProducts(data)
        setFilteredProducts(data)
      },
      setError,
      setLoading
    )
  }, [refresh])

  const handlerSearch = (term: string) => {
    setSearchTerm(term)
    if (!term.trim()) {
      setFilteredProducts(products)
      return
    }
    const searchTerm = term.toLowerCase()
    const data = products.filter((product) => {
      return product.name.toLowerCase().includes(searchTerm) || product.productId.toLowerCase().includes(searchTerm)
    })
    setFilteredProducts(data)
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
      setRefresh((refresh) => !refresh)
      setEditingProduct(undefined)
    } else {
      const { ok, error } = (await createProduct(data)) as { ok: boolean; error: number }
      setShowForm(!ok)
      if (!ok) toast.error(getErrorMessage(error))
      else setRefresh((refresh) => !refresh)
    }
  }

  const handleDeleteProduct = async (id: number) => {
    const { ok, error } = (await deleteProduct(id)) as { ok: boolean; error: number }
    if (!ok) toast.error(getErrorMessage(error))
    else setRefresh((refresh) => !refresh)
  }

  const handleCancelForm = () => {
    setShowForm(false)
    setEditingProduct(undefined)
  }

  if (loading) return <LoadingCard />
  if (error > 0) {
    if (error === 1101) return <NotProducts searchTerm={searchTerm} />
    return <ErrorCard message={getErrorMessage(error)} />
  }

  return (
    <>
      <Header title="Dashboard" />
      <div className="min-h-screen">
        <Toaster richColors position="bottom-center" />
        <div className="flex justify-center m-6">
          <button
            onClick={handleCreateProduct}
            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium"
          >
            + Nuevo Producto
          </button>
        </div>
        {filteredProducts && filteredProducts.length > 0 && (
          <Search
            searchTerm={searchTerm}
            handlerSearch={handlerSearch}
            setSearchTerm={setSearchTerm}
            placeholder="Bucar por ID o Nombre"
          />
        )}

        {filteredProducts && filteredProducts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 m-4 gap-6">
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
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No hay productos</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm
                ? 'No se encontraron productos con los filtros aplicados'
                : 'Comienza agregando tu primer producto'}
            </p>
          </div>
        )}

        {showForm && <ProductForm product={editingProduct} onSave={handleSaveProduct} onCancel={handleCancelForm} />}
      </div>
    </>
  )
}
