import { useState, useEffect } from 'preact/hooks'
import type { ProductIn, ProductType } from '@/types'
import { uploadFile } from '@/shared/supabase'
import { categories, normalize } from '@/shared/utils'
import styles from '@/styles/ProductForm.module.css'
import { toast } from 'sonner'

interface Props {
  product?: ProductType
  onSave: (data: ProductIn) => void
  onCancel: () => void
}

export function ProductForm({ product, onSave, onCancel }: Props) {
  const newProduct = {
    productId: product?.productId ?? '',
    description: product?.description ?? '',
    category: product?.category ? normalize(product.category) : '',
    price: product?.price ?? '',
    weight: product?.weight ?? '',
    karats: product?.karats ?? '',
    pictures: product?.pictures ?? ([] as string[]),
    isActive: product?.isActive ?? true,
    hasDiscount: product?.hasDiscount ?? false,
    offerPrice: product?.offerPrice ?? undefined
  }
  const [productData, setProductData] = useState<ProductIn>(newProduct as ProductIn)
  const [images, setImages] = useState<File[]>([])
  const [imagesUrls, setImagesUrls] = useState<string[]>([])

  useEffect(() => {
    if (product?.pictures) {
      const urls = product.pictures.filter((pic): pic is string => typeof pic === 'string')
      setImagesUrls(urls)
    } else {
      setImagesUrls([])
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
    const files = target.files ? Array.from(target.files) : []

    const overs = files.filter((f) => f.size > 100 * 1024)
    if (overs.length) {
      toast.error(`Estas imágenes superan 100KB: ${overs.map((f) => f.name).join(', ')}`)
    }

    const currentTotal = images.length + imagesUrls.length
    const remaining = Math.max(0, 2 - currentTotal)
    const acceptable = files.filter((f) => f.size <= 100 * 1024)
    const toAdd = acceptable.slice(0, remaining)

    if (acceptable.length > remaining) {
      toast.error(`Solo puedes subir ${remaining} imagen(es) más`)
    }

    if (toAdd.length) setImages((prev) => [...prev, ...toAdd])
    target.value = ''
  }

  const removeNewImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  const removeExistingImage = (index: number) => {
    setImagesUrls((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: Event) => {
    e.preventDefault()

    const karatsInput = productData.karats.toString().trim()
    const karatValues = karatsInput
      .split(/[,\s]+/)
      .filter((v: string) => v.length > 0)
      .map((v: string) => parseInt(v))

    if (karatValues.length === 0) {
      toast.error('Debe ingresar al menos un kilate')
      return
    }

    if (karatValues.length > 2) {
      toast.error('Solo puede ingresar 1 o 2 kilates')
      return
    }

    for (const karat of karatValues) {
      if (Number.isNaN(karat) || karat <= 0 || !Number.isInteger(karat)) {
        toast.error(`"${karat}" no es un kilate válido. Debe ser un número entero positivo`)
        return
      }
    }

    if (productData.hasDiscount && productData.offerPrice) {
      const normalPrice = Number(productData.price)
      const offerPrice = Number(productData.offerPrice)

      if (offerPrice >= normalPrice) {
        toast.error('El precio de oferta debe ser menor al precio normal')
        return
      }
    }

    const uploadPromises = images.map((file) => uploadFile(file))
    const uploadResults = await Promise.all(uploadPromises ?? [])
    const errors = uploadResults.filter((result) => typeof result !== 'string')
    if (errors.length > 0) toast.error('Ha ocurrido un error al subir las imagenes')
    const newImagesUrls = uploadResults.filter((url): url is string => typeof url === 'string')

    const newProduct: ProductIn = {
      ...productData,
      weight: Number(String(productData.weight).replace(',', '.')) || 0,
      karats: karatValues,
      pictures: [...newImagesUrls, ...imagesUrls]
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
                <label className={styles.label}>Kilates *</label>
                <input
                  name="karats"
                  type="text"
                  value={Array.isArray(productData.karats) ? productData.karats.join(' ') : productData.karats}
                  onChange={handleInputChange}
                  required
                  className={styles.input}
                  placeholder="Ej: 18 o 18 24"
                />
                <p className={styles.helpText}>Ingresa 1 o 2 valores enteros separados por espacio o coma</p>
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
                <span className={styles.checkboxLabel}>Disponible</span>
              </label>
              <p className={styles.helpText}>¿Está disponible?</p>
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.checkboxContainer}>
                <input
                  type="checkbox"
                  name="hasDiscount"
                  checked={productData.hasDiscount}
                  onChange={handleCheckboxChange}
                  className={styles.checkbox}
                />
                <span className={styles.checkboxLabel}>Descuento</span>
              </label>
              <p className={styles.helpText}>¿Tiene descuento?</p>
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label}>Precio de oferta (USD) *</label>
              <input
                type="number"
                name="offerPrice"
                value={productData.offerPrice}
                onInput={handleInputChange}
                required
                min="0"
                step="0.01"
                className={styles.input}
                placeholder="0.00"
                disabled={!productData.hasDiscount}
              />
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
                  <p className={styles.helpText}>Formatos: JPG, PNG, GIF. Tamaño máximo: 100KB por imagen</p>
                </div>
              )}

              {images.length > 0 && (
                <div className={styles.imageGrid}>
                  {images.map((image, index) => (
                    <div key={`new-${index}`} className={styles.imageContainer}>
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Nueva imagen ${index + 1}`}
                        className={styles.existingImage}
                        loading="lazy"
                      />
                      <div className={styles.imageOverlay}>
                        <span className={styles.imageOverlayText}>Nueva imagen</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeNewImage(index)}
                        className={styles.removeImageButton}
                        aria-label="Eliminar imagen"
                      >
                        ×
                      </button>
                    </div>
                  ))}
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
                        type="button"
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
