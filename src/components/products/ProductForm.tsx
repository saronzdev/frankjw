import { useState, useEffect } from 'preact/hooks'
import type { ProductIn, ProductType } from '@/types'
import { uploadImage } from '@/shared/storage'
import { categories, normalize } from '@/shared/utils'
import { Modal } from '@/ui/Modal'
import { Button } from '@/ui/Button'
import { IconButton } from '@/ui/IconButton'
import { X, ImagePlus } from 'lucide-preact'
import { toast } from 'sonner'

interface Props {
  product?: ProductType
  onSave: (data: ProductIn) => void
  onCancel: () => void
}

const field =
  'h-10 w-full rounded-md border border-line bg-surface px-3 text-sm text-ink placeholder:text-ink-muted ' +
  'transition-colors hover:border-ink/30 focus-visible:outline-none focus-visible:border-gold focus-visible:ring-2 focus-visible:ring-gold/35'
const disabledField = 'disabled:pointer-events-none disabled:opacity-50'
const labelCls = 'text-sm font-medium text-ink'
const helpCls = 'text-xs text-ink-muted'

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
    hasPreciousStones: product?.hasPreciousStones ?? false,
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

    const uploadPromises = images.map((file) => uploadImage(file))
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
    <Modal open onClose={onCancel} title={product ? 'Editar Producto' : 'Nuevo Producto'} size="lg">
      <form onSubmit={handleSubmit} class="flex flex-col gap-4">
        <div class="flex flex-col gap-1.5">
          <label class={labelCls} for="pf-productId">ID del producto *</label>
          <input
            type="text"
            id="pf-productId"
            name="productId"
            value={productData.productId}
            onInput={handleInputChange}
            required
            class={field}
            placeholder="Ej: ABC123"
          />
        </div>

        <div class="flex flex-col gap-1.5">
          <label class={labelCls} for="pf-description">Descripción *</label>
          <textarea
            id="pf-description"
            name="description"
            value={productData.description}
            onInput={handleInputChange}
            required
            rows={3}
            class={`${field} min-h-0 py-2.5`}
            placeholder="Describe las características del producto..."
          />
        </div>

        <div class="grid gap-4 sm:grid-cols-2">
          <div class="flex flex-col gap-1.5">
            <label class={labelCls} for="pf-category">Categoría *</label>
            <select
              id="pf-category"
              name="category"
              value={productData.category}
              onChange={handleInputChange}
              required
              class={`${field} cursor-pointer appearance-none`}
            >
              <option value="">Seleccionar categoría</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div class="flex flex-col gap-1.5">
            <label class={labelCls} for="pf-price">Precio (USD) *</label>
            <input
              type="number"
              id="pf-price"
              name="price"
              value={productData.price}
              onInput={handleInputChange}
              required
              min="0"
              step="0.01"
              class={field}
              placeholder="0.00"
            />
          </div>
        </div>

        <div class="grid gap-4 sm:grid-cols-2">
          <div class="flex flex-col gap-1.5">
            <label class={labelCls} for="pf-weight">Peso (gramos) *</label>
            <input
              type="text"
              pattern="^\d*([,.]\d+)?$"
              id="pf-weight"
              name="weight"
              value={productData.weight}
              onInput={handleInputChange}
              required
              class={field}
              placeholder="0.00"
            />
          </div>

          <div class="flex flex-col gap-1.5">
            <label class={labelCls} for="pf-karats">Kilates *</label>
            <input
              id="pf-karats"
              name="karats"
              type="text"
              value={Array.isArray(productData.karats) ? productData.karats.join(' ') : productData.karats}
              onChange={handleInputChange}
              required
              class={field}
              placeholder="Ej: 18 o 18 24"
            />
            <p class={helpCls}>Ingresa 1 o 2 valores enteros separados por espacio o coma</p>
          </div>
        </div>

        <div class="grid gap-2 sm:grid-cols-2">
          <label class="flex cursor-pointer items-center gap-2 text-sm text-ink-soft">
            <input
              type="checkbox"
              name="isActive"
              checked={productData.isActive}
              onChange={handleCheckboxChange}
              class="accent-gold"
            />
            <span>Disponible</span>
          </label>
          <label class="flex cursor-pointer items-center gap-2 text-sm text-ink-soft">
            <input
              type="checkbox"
              name="hasDiscount"
              checked={productData.hasDiscount}
              onChange={handleCheckboxChange}
              class="accent-gold"
            />
            <span>Descuento</span>
          </label>
        </div>

        <label class="flex cursor-pointer items-center gap-2 text-sm text-ink-soft">
          <input
            type="checkbox"
            name="hasPreciousStones"
            checked={productData.hasPreciousStones}
            onChange={handleCheckboxChange}
            class="accent-gold"
          />
          <span>Contiene piedras preciosas</span>
        </label>

        <div class="flex flex-col gap-1.5">
          <label class={labelCls} for="pf-offerPrice">Precio de oferta (USD) *</label>
          <input
            type="number"
            id="pf-offerPrice"
            name="offerPrice"
            value={productData.offerPrice}
            onInput={handleInputChange}
            required
            min="0"
            step="0.01"
            class={`${field} ${disabledField}`}
            placeholder="0.00"
            disabled={!productData.hasDiscount}
          />
        </div>

        <div class="flex flex-col gap-2">
          <span class={labelCls}>
            Imágenes (máximo 2) {images.length + imagesUrls.length}/2
          </span>
          {images.length + imagesUrls.length < 2 && (
            <div class="flex flex-col gap-1">
              <input
                type="file"
                name="pictures"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                class="text-sm text-ink-muted file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-surface-2 file:px-3 file:py-2 file:text-sm file:font-medium file:text-ink hover:file:bg-gold-soft"
              />
              <p class={helpCls}>Formatos: JPG, PNG, GIF. Tamaño máximo: 100KB por imagen</p>
            </div>
          )}

          {(images.length > 0 || imagesUrls.length > 0) && (
            <div class="grid grid-cols-2 gap-3">
              {images.map((image, index) => (
                <figure key={`new-${index}`} class="relative overflow-hidden rounded-md border border-line">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Nueva imagen ${index + 1}`}
                    class="aspect-square w-full object-contain"
                    loading="lazy"
                  />
                  <figcaption class="absolute bottom-1.5 left-1.5 rounded-full bg-black/55 px-2 py-0.5 text-[0.7rem] text-white">
                    Nueva imagen
                  </figcaption>
                  <IconButton
                    size="sm"
                    label="Eliminar imagen"
                    onClick={() => removeNewImage(index)}
                    class="absolute right-1.5 top-1.5 border border-line bg-white/90 shadow-sm"
                  >
                    <X size={13} aria-hidden="true" />
                  </IconButton>
                </figure>
              ))}
              {imagesUrls.map((imageUrl, index) => (
                <figure key={`existing-${index}`} class="relative overflow-hidden rounded-md border border-line">
                  <img
                    src={imageUrl}
                    alt={`Imagen existente ${index + 1}`}
                    class="aspect-square w-full object-contain"
                    loading="lazy"
                  />
                  <figcaption class="absolute bottom-1.5 left-1.5 rounded-full bg-black/55 px-2 py-0.5 text-[0.7rem] text-white">
                    Imagen existente
                  </figcaption>
                  <IconButton
                    size="sm"
                    label="Eliminar imagen"
                    onClick={() => removeExistingImage(index)}
                    class="absolute right-1.5 top-1.5 border border-line bg-white/90 shadow-sm"
                  >
                    <X size={13} aria-hidden="true" />
                  </IconButton>
                </figure>
              ))}
            </div>
          )}

          {images.length + imagesUrls.length === 0 && (
            <p class="flex items-center gap-1.5 text-xs text-ink-muted">
              <ImagePlus size={14} aria-hidden="true" />
              Aún no hay imágenes seleccionadas
            </p>
          )}
        </div>

        <div class="flex justify-end gap-3 border-t border-line pt-4">
          <Button variant="outline" onClick={onCancel} aria-label="Cancelar el formulario">
            Cancelar
          </Button>
          <Button type="submit" aria-label={`${product ? 'Actualizar' : 'Crear'} Producto`}>
            {product ? 'Actualizar' : 'Crear'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
