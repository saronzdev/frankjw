import { useState, useEffect } from 'preact/hooks'
import type { ProductIn, ProductType } from '@/types'
import { uploadFile } from '@/shared/supabase'
import { categories } from '@/shared/utils'
import styles from '@/styles/ProductForm.module.css'

interface Props {
  product?: ProductType
  onSave: (data: ProductIn) => void
  onCancel: () => void
}

export function ProductForm({ product, onSave, onCancel }: Props) {
  const newProduct = {
    //name: product?.name ?? '',
    productId: product?.productId ?? '',
    description: product?.description ?? '',
    category: product?.category ?? '',
    price: product?.price ?? '',
    weight: product?.weight ?? '',
    karats: product?.karats.join(' ') ?? '',
    pictures: product?.pictures ?? ([] as string[]),
    isActive: product?.isActive ?? true
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

  const handleCheckboxChange = (e: Event) => {
    const target = e.target as HTMLInputElement
    const { name, checked } = target

    setProductData((prev: ProductIn) => ({
      ...prev,
      [name]: checked
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

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <div className={styles.header}>
            <h2 className={styles.title}>{product ? 'Editar Producto' : 'Nuevo Producto'}</h2>
            <button onClick={onCancel} className={styles.closeButton} aria-label="Cerrar formulario">
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.fieldGroup}>
              <label className={styles.label}>ID del producto *</label>
              <input
                type="text"
                name="productId"
                value={productData.productId}
                onInput={handleInputChange}
                required
                className={styles.input}
                placeholder="Ej: ABC123"
              />
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label}>Descripción *</label>
              <textarea
                name="description"
                value={productData.description}
                onInput={handleInputChange}
                required
                rows={3}
                className={styles.textarea}
                placeholder="Describe las características del producto..."
              />
            </div>

            <div className={styles.gridTwoColumns}>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Categoría *</label>
                <select
                  name="category"
                  value={productData.category}
                  onChange={handleInputChange}
                  required
                  className={styles.select}
                >
                  <option value="">Seleccionar categoría</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>Precio (USD) *</label>
                <input
                  type="number"
                  name="price"
                  value={productData.price}
                  onInput={handleInputChange}
                  required
                  min="0"
                  step="0.01"
                  className={styles.input}
                  placeholder="0.00"
                />
              </div>
            </div>

            <div className={styles.gridTwoColumns}>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Peso (gramos) *</label>
                <input
                  type="text"
                  pattern="^\d*([,.]\d+)?$"
                  name="weight"
                  value={productData.weight}
                  onInput={handleInputChange}
                  required
                  className={styles.input}
                  placeholder="0.00"
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>Quilates *</label>
                <input
                  name="karats"
                  type="text"
                  value={productData.karats}
                  onChange={handleInputChange}
                  required
                  className={styles.input}
                  placeholder="0"
                />
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.checkboxContainer}>
                <input
                  type="checkbox"
                  name="isActive"
                  checked={productData.isActive}
                  onChange={handleCheckboxChange}
                  className={styles.checkbox}
                />
                <span className={styles.checkboxLabel}>Producto disponible</span>
              </label>
              <p className={styles.helpText}>Desmarca si el producto está agotado</p>
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label}>Imágenes (máximo 2) {images.length + imagesUrls.length}/2</label>
              {images.length + imagesUrls.length < 2 && (
                <div>
                  <input
                    type="file"
                    name="pictures"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className={styles.fileInput}
                  />
                  <p className={styles.helpText}>Formatos: JPG, PNG, GIF. Tamaño máximo: 5MB por imagen</p>
                </div>
              )}

              {imagesUrls.length > 0 && (
                <div className={styles.imageGrid}>
                  {imagesUrls.map((imageUrl, index) => (
                    <div key={`existing-${index}`} className={styles.imageContainer}>
                      <img
                        src={imageUrl}
                        alt={`Imagen existente ${index + 1}`}
                        className={styles.existingImage}
                        loading="lazy"
                      />
                      <div className={styles.imageOverlay}>
                        <span className={styles.imageOverlayText}>Imagen existente</span>
                      </div>
                      <button
                        onClick={() => removeExistingImage(index)}
                        className={styles.removeImageButton}
                        aria-label="Eliminar imagen"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className={styles.buttonContainer}>
              <button
                type="submit"
                className={styles.submitButton}
                aria-label={`${product ? 'Actualizar' : 'Crear'} Producto`}
              >
                {product ? 'Actualizar' : 'Crear'}
              </button>
              <button type="button" onClick={onCancel} className={styles.cancelButton} aria-label="Cancelar el formulario">
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
