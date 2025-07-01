import { useState, useEffect } from 'preact/hooks'
import type { ProductIn } from '../../shared/types'
import { uploadFile } from '../../shared/supabase'
// import { uploadFile } from '../../shared/supabase'

interface ProductFormProps {
  product?: ProductIn
  onSave: (data: ProductIn) => void
  onCancel: () => void
}

export function ProductForm({ product, onSave, onCancel }: ProductFormProps) {
  const newProduct = {
    name: product?.name ?? '',
    productId: product?.productId ?? '',
    description: product?.description ?? '',
    category: product?.category ?? '',
    price: product?.price ?? 0,
    weight: product?.weight ?? '',
    karats: product?.karats ?? '',
    pictures: product?.pictures ?? ([] as string[])
  }
  const [productData, setProductData] = useState<ProductIn>(newProduct as ProductIn)
  const [images, setImages] = useState<File[]>([])
  const [imagesUrls, setImagesUrls] = useState<string[]>([])

  useEffect(() => {
    if (product?.pictures) {
      const urls = product.pictures.filter((pic): pic is string => typeof pic === 'string')
      setImagesUrls(urls)
    }
  }, [])

  const handleInputChange = (e: Event) => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    const { name, value, type } = target

    setProductData((prev: ProductIn) => ({
      ...prev,
      [name]: type === 'number' ? Number.parseFloat(value) || 0 : value
    }))
  }

  const handleImageChange = (e: Event) => {
    const target = e.target as HTMLInputElement
    const files = target.files as unknown as File[]
    setImages((prev) => [...prev, ...files])
  }

  const removeExistingImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: Event) => {
    e.preventDefault()
    const uploadPromises = images.map((file) => uploadFile(file))
    const uploadResults = await Promise.all(uploadPromises ?? [])
    const errors = uploadResults.filter((result) => typeof result !== 'string')
    if (errors.length > 0) alert('Ha ocurrido un error al subir las imagenes')
    const imagesUrls = uploadResults.filter((url): url is string => typeof url === 'string')

    const newProduct: ProductIn = {
      ...productData,
      pictures: [...imagesUrls, ...(productData.pictures as string[])]
    }
    onSave(newProduct)
  }

  const categories = ['Anillos', 'Collares', 'Pulseras', 'Aretes', 'Cadenas', 'Dijes', 'Otros']

  return (
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-light text-gray-900">{product ? 'Editar Producto' : 'Nuevo Producto'}</h2>
            <button onClick={onCancel} class="text-gray-400 hover:text-gray-600 text-2xl">
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit} class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Nombre del producto *</label>
              <input
                type="text"
                name="name"
                value={productData.name}
                onInput={handleInputChange}
                required
                class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none"
                placeholder="Ej: Anillo de compromiso"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">ID del producto *</label>
              <input
                type="text"
                name="productId"
                value={productData.productId}
                onInput={handleInputChange}
                required
                class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none"
                placeholder="Ej: ABC123"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Descripción *</label>
              <textarea
                name="description"
                value={productData.description}
                onInput={handleInputChange}
                required
                rows={3}
                class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none resize-none"
                placeholder="Describe las características del producto..."
              />
            </div>

            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Categoría *</label>
                <select
                  name="category"
                  value={productData.category}
                  onChange={handleInputChange}
                  required
                  class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none"
                >
                  <option value="">Seleccionar categoría</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Precio (USD) *</label>
                <input
                  type="number"
                  name="price"
                  value={productData.price}
                  onInput={handleInputChange}
                  required
                  min="0"
                  step="0.01"
                  class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Peso (gramos) *</label>
                <input
                  type="text"
                  pattern="^\d*([,.]\d+)?$"
                  name="weight"
                  value={productData.weight}
                  onInput={handleInputChange}
                  required
                  class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Quilates *</label>
                <input
                  name="karats"
                  type="text"
                  value={productData.karats}
                  onChange={handleInputChange}
                  required
                  class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none"
                  placeholder="0"
                />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Imágenes (máximo 3) {images.length + imagesUrls.length}/3
              </label>
              {images.length + imagesUrls.length < 3 && (
                <div>
                  <input
                    type="file"
                    name="pictures"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none"
                  />
                  <p class="mt-1 text-xs text-gray-500">Formatos: JPG, PNG, GIF. Tamaño máximo: 5MB por imagen</p>
                </div>
              )}

              {imagesUrls.length > 0 && (
                <div class="grid grid-cols-3 gap-4 mt-4">
                  {imagesUrls.map((imageUrl, index) => (
                    <div key={`existing-${index}`} class="relative group">
                      <img
                        src={imageUrl}
                        alt={`Imagen existente ${index + 1}`}
                        class="w-full h-24 object-cover rounded-lg border border-gray-200"
                      />
                      <div class="absolute inset-0 bg-black bg-opacity-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span class="text-white text-xs text-center px-2">Imagen existente</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeExistingImage(index)}
                        class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 transition-colors"
                        title="Eliminar imagen"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div class="flex gap-4 pt-4">
              <button
                type="submit"
                class="flex-1 bg-gray-900 text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors font-medium"
              >
                {product ? 'Actualizar' : 'Crear'}
              </button>
              <button
                type="button"
                onClick={onCancel}
                class="flex-1 bg-gray-200 text-gray-800 py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
