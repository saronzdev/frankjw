import { useEffect, useState } from 'preact/hooks'
import { ProductForm } from '../components/Products/ProductForm'
import { ProductCard } from '../components/Products/ProductCard'
import { Search } from '../components/Products/Search'
import { type ProductIn, type ProductType } from '../shared/types'
import { createProduct, deleteProduct, getProducts, isUserAdmin, updateProduct } from '../shared/fetching'
import { getErrorMessage } from '../shared/utils'
import { LoadingCard } from '../components/Products/LoadigCard'
import { ErrorCard } from '../components/Products/ErrorCard'
import { NotProducts } from '../components/Products/NotProducts'
import { Toaster, toast } from 'sonner'
import { useLocation } from 'wouter'

const is = await isUserAdmin()

export function Dashboard() {
  const [_, setLocation] = useLocation()

  if (!is) setLocation('/login')

  const [products, setProducts] = useState<ProductType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(0)
  const [refresh, setRefresh] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<ProductType>()
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([])
  const [isSearching, setIsSearching] = useState(false)

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
      setIsSearching(false)
      return
    }

    setIsSearching(true)
    const searchTerm = term.toLowerCase().trim()
    const data = products.filter((product) => {
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

  if (loading && products.length === 0) return <LoadingCard />
  if (error > 0 && error !== 1101) {
    return <ErrorCard message={getErrorMessage(error)} />
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
          {products.length > 0 && (
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
            <NotProducts searchTerm={searchTerm} hasProducts={products.length > 0} />
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
