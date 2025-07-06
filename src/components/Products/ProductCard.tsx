import { useState } from 'preact/hooks'
import { increaseSales } from '@/shared/fetching'
import type { ProductType } from '../../shared/types'
import noImage from '@/assets/no-image.svg'
import edit from '@/assets/edit.svg'
import trash from '@/assets/trash.svg'
import buy from '@/assets/buy.svg'

interface Props {
  data: ProductType
  editable?: boolean
  onEdit?: (product: ProductType) => void
  onDelete?: (id: number) => void
}

export function ProductCard({ data, editable = false, onDelete, onEdit }: Props) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isImageLoading, setIsImageLoading] = useState(true)
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)

  const handleDelete = () => {
    if (confirm(`¿Estás seguro de que quieres eliminar "${data.name}"?`)) {
      onDelete?.(data.id)
    }
  }

  const waMsg = `https://api.whatsapp.com/send?phone=5353444690&text=Hola+quisiera+reservar+el+${encodeURIComponent(
    data.name
  )}+(ID:+${data.productId})`

  const productImages = data.pictures && data.pictures.length > 0 ? data.pictures : [noImage]

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % productImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length)
  }

  const isDescriptionLong = data.description.length > 100

  return (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100">
      <div className="relative overflow-hidden">
        <div className="relative h-64 bg-gray-100">
          {isImageLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          <img
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            src={productImages[currentImageIndex]}
            alt={data.name}
            loading="lazy"
            onLoad={() => setIsImageLoading(false)}
            onError={() => setIsImageLoading(false)}
          />

          {productImages.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1">
                {productImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </>
          )}

          <div className="absolute top-3 left-3">
            <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
              ${data.price}
            </span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-yellow-600 transition-colors">
            {data.name}
          </h3>
          <div className="text-gray-600 text-sm leading-relaxed">
            <p className={isDescriptionExpanded ? '' : 'line-clamp-2'}>{data.description}</p>
            {isDescriptionLong && (
              <button
                onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                className="text-yellow-600 hover:text-yellow-700 font-medium mt-1 text-md transition-colors duration-200"
              >
                {isDescriptionExpanded ? 'Ver menos' : 'Ver más'}
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-3 rounded-xl text-center border border-gray-200">
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Peso</p>
            <p className="text-lg font-bold text-gray-900">{data.weight}g</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-3 rounded-xl text-center border border-yellow-200">
            <p className="text-xs text-yellow-700 font-medium uppercase tracking-wide">Quilates</p>
            <p className="text-lg font-bold text-yellow-800">{data.karats.join(' | ')}</p>
          </div>
        </div>

        <div className="space-y-3">
          {editable ? (
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => onEdit?.(data)}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 py-3 px-4 rounded-xl hover:from-slate-200 hover:to-slate-300 transition-all duration-300 font-medium shadow-sm hover:shadow-md transform hover:scale-105"
              >
                <img className="w-4 h-4" src={edit} />
                Editar
              </button>
              <button
                onClick={handleDelete}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-rose-100 to-rose-200 text-rose-700 py-3 px-4 rounded-xl hover:from-rose-200 hover:to-rose-300 transition-all duration-300 font-medium shadow-sm hover:shadow-md transform hover:scale-105"
              >
                <img className="w-4 h-4" src={trash} />
                Eliminar
              </button>
            </div>
          ) : (
            <a
              href={waMsg}
              onClick={() => increaseSales(data.id)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 px-6 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <img className="w-5 h-5" src={buy} />
              Reservar por WhatsApp
            </a>
          )}
        </div>

        {editable && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-400 text-center font-mono">ID: {data.productId}</p>
          </div>
        )}
      </div>
    </div>
  )
}
