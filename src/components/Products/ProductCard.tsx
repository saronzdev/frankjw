import { useState } from 'preact/hooks'
import noImage from '@/assets/no-image.svg'
import type { ProductType } from '../../shared/types'
import sample from '@/assets/sample1.jpg'
import { ImageGallery } from './ImageGallery'

interface Props {
  data: ProductType
  editable?: boolean
  onEdit?: (product: ProductType) => void
  onDelete?: (id: number) => void
}

export function ProductCard({ data, editable = false, onDelete, onEdit }: Props) {
  const handleDelete = () => {
    if (confirm(`¿Estás seguro de que quieres eliminar "${data.name}"?`)) {
      onDelete?.(data.id)
    }
  }

  const waMsg = `https://api.whatsapp.com/send?phone=5356433122&text=Hola+quisiera+reservar+el+${encodeURIComponent(
    data.name
  )}+(ID:+${data.productId})`

  const [isGalleryOpen, setIsGalleryOpen] = useState(false)

  const productImages = (() => {
    if (!data.pictures || !Array.isArray(data.pictures)) return [sample]
    const validPics = data.pictures.filter((pic): pic is string => typeof pic === 'string')
    return validPics
  })()

  const openGallery = () => {
    setIsGalleryOpen(true)
  }

  return (
    <div className="bg-white rounded-lg shadow-md mb-1 flex flex-col">
      <div className="flex justify-center">
        <button
          onClick={openGallery}
          className={`p-0 border-0 bg-transparent ${productImages.length > 0 ? 'cursor-pointer' : ''}`}
          aria-label="Ver imagen ampliada"
        >
          <img
            className="rounded-lg w-60 object-cover h-60 hover:opacity-90 transition-opacity"
            src={productImages[0] || noImage}
            alt={data.name}
            loading="lazy"
          />
        </button>
        {isGalleryOpen && productImages.length > 0 && (
          <ImageGallery images={productImages} onClose={() => setIsGalleryOpen(false)} />
        )}
      </div>
      <div className="p-4 flex-grow flex flex-col text-center">
        <h2 className="text-2xl font-semibold line-clamp-2">{data.name}</h2>
        <p className="my-2 text-gray-600 text-md line-clamp-2 flex-grow">{data.description}</p>
        <div className="flex items-center space-x-4">
          <div className="bg-gray-50 p-2 rounded flex-1 text-center">
            <p className="text-sm text-gray-600">Peso</p>
            <p className="font-medium">{data.weight} g</p>
          </div>
          <div className="bg-gray-50 p-2 rounded flex-1 text-center">
            <p className="text-sm text-gray-600">Quilates</p>
            <p className="font-medium">{data.karats} K</p>
          </div>
        </div>
        <div className={`flex justify-between items-center mt-4 pt-3 border-t ${editable ? 'space-x-2' : ''}`}>
          {editable ? (
            <>
              <button
                onClick={() => onEdit?.(data)}
                class="flex-1 bg-gray-100 text-gray-700 py-2 px-3 rounded hover:bg-gray-200 transition-colors text-sm font-medium"
              >
                Editar
              </button>
              <button
                onClick={handleDelete}
                class="flex-1 bg-red-50 text-red-600 py-2 px-3 rounded hover:bg-red-100 transition-colors text-sm font-medium"
              >
                Eliminar
              </button>
            </>
          ) : (
            <>
              <p className="text-lg font-semibold">{data.price} USD</p>
              <a
                href={waMsg}
                target="_blank"
                className="px-8 py-4 text-lg text-white bg-black rounded-full hover:bg-gray-800 transition-colors"
              >
                Reservar
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
