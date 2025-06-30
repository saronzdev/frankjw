import { useEffect, useState } from 'preact/hooks'
import { ProductForm } from '../components/Products/ProductForm'
import { ProductCard } from '../components/Products/ProductCard'
import { Search } from '../components/Products/Search'
import type { ProductIn, ProductType } from '../shared/types'
import { createProduct, deleteProduct, getProducts, updateProduct } from '../shared/fetching'
import { getAuth } from '../shared/utils'

export function Dashboard() {
  if (getAuth()?.role !== 'admin') return (window.location.href = '/')
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
      const { ok, error } = await updateProduct(editingProduct.id, data)
      if (!ok) alert(`Ha ocurrido un error. ErrorCode: ${error}`)
      else setRefresh(true)
    } else {
      const { ok, error } = await createProduct(data)
      if (!ok) alert(`Ha ocurrido un error. ErrorCode: ${error}`)
      else setRefresh(true)
    }
    setShowForm(false)
    setEditingProduct(undefined)
  }

  const handleDeleteProduct = async (id: number) => {
    const { ok, error } = await deleteProduct(id)
    if (!ok) alert(`Ha ocurrido un error. ErrorCode: ${error}`)
    else setRefresh(true)
  }

  const handleCancelForm = () => {
    setShowForm(false)
    setEditingProduct(undefined)
  }

  if (loading) return <p className="mt-4 text-center text-lg">Cargando...</p>
  if (error > 0) return <p className="mt-4 text-red-700 text-center text-lg">Ups... ocurrió un error.ErrorCode: {error}</p>

  return (
    <div className="min-h-screen">
      <div className="flex justify-center m-6">
        <button
          onClick={handleCreateProduct}
          className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium"
        >
          + Nuevo Producto
        </button>
      </div>
      <Search
        searchTerm={searchTerm}
        handlerSearch={handlerSearch}
        setSearchTerm={setSearchTerm}
        placeholder="Bucar por ID o Nombre"
      />

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
            {searchTerm ? 'No se encontraron productos con los filtros aplicados' : 'Comienza agregando tu primer producto'}
          </p>
        </div>
      )}

      {showForm && <ProductForm product={editingProduct} onSave={handleSaveProduct} onCancel={handleCancelForm} />}
    </div>
  )
}
