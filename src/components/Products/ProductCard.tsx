import { useState, useEffect, useRef } from 'preact/hooks'
import { increaseSales } from '@/shared/fetching'
import type { ProductType } from '@/shared/types'
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
  const [isImageLoading, setIsImageLoading] = useState(true)
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)
  const [isDescriptionLong, setIsDescriptionLong] = useState(false)
  const descriptionRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const element = descriptionRef.current
    if (!element) return

    const checkOverflow = () => {
      if (!element) return
      if (!isDescriptionExpanded) {
        const isOverflowing = element.scrollHeight > element.clientHeight
        setIsDescriptionLong(isOverflowing)
      }
    }

    checkOverflow()

    const resizeObserver = new ResizeObserver(checkOverflow)
    resizeObserver.observe(element)

    return () => resizeObserver.disconnect()
  }, [data.description, isDescriptionExpanded])

  const handleDelete = () => {
    if (confirm(`¿Estás seguro de que quieres eliminar "${data.name}"?`)) {
      onDelete?.(data.id)
    }
  }

  const waMsg = `https://api.whatsapp.com/send?phone=5353444690&text=Hola+quisiera+reservar+el+${encodeURIComponent(
    data.name
  )}+(ID:+${data.productId})`

  const firstImage = data.pictures && data.pictures.length > 0 ? data.pictures[0] : noImage

  return (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100">
      <div className="relative overflow-hidden">
        <div className="relative h-64 bg-gray-100 flex items-center justify-center">
          {isImageLoading && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="w-8 h-8 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          <img
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            src={firstImage}
            alt={data.name}
            loading="lazy"
            onLoad={() => setIsImageLoading(false)}
            onError={() => setIsImageLoading(false)}
          />

          <div className="absolute top-3 left-3">
            <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
              {data.price} USD
            </span>
          </div>

          {data.isActive === false && (
            <div className="absolute top-3 right-3">
              <span className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                Agotado
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-yellow-600 transition-colors">
            {data.name}
          </h3>
          <div className="text-gray-600 text-sm leading-relaxed">
            <p ref={descriptionRef} className={`${isDescriptionExpanded ? '' : 'line-clamp-2'}`}>
              {data.description}
            </p>
            {(isDescriptionLong || isDescriptionExpanded) && (
              <button
                onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                className="text-yellow-600 hover:text-yellow-700 font-medium mt-1 text-xs transition-colors duration-200"
              >
                {isDescriptionExpanded ? 'Ver menos' : 'Ver más'}
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-3 rounded-xl text-center border border-gray-200">
            <p className="text-md text-gray-500 font-medium tracking-wide">Peso (g)</p>
            <p className="text-lg font-bold text-gray-900">{data.weight}</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-3 rounded-xl text-center border border-yellow-200">
            <p className="text-md text-yellow-700 font-medium tracking-wide">Quilates</p>
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
            <>
              {data.isActive === false && (
                <div className="bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200 rounded-xl p-3 text-center">
                  <p className="text-orange-700 text-sm font-medium">Producto agotado, pero aún puedes reservarlo</p>
                </div>
              )}
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
            </>
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
