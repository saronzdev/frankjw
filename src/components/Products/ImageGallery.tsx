import { useState, useEffect } from 'preact/hooks'

interface Props {
  images: string[]
  onClose: () => void
}

export function ImageGallery({ images, onClose }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [imageError, setImageError] = useState(false)

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
    setImageError(false)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
    setImageError(false)
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') goToPrev()
      if (e.key === 'ArrowRight') goToNext()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    setImageError(false)
  }, [currentIndex])

  const handleBackdropClick = (e: Event) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const handleImageError = () => {
    setImageError(true)
  }

  return (
    <div
      class="fixed inset-0 bg-gray-900 bg-opacity-95 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <button
        onClick={onClose}
        class="absolute top-4 right-4 text-white hover:bg-gray-500 hover:bg-opacity-20 p-2 rounded-full transition-colors z-10"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      {images.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation()
              goToPrev()
            }}
            class="absolute left-4 bg-gray-500 bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-colors z-10"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15,18 9,12 15,6"></polyline>
            </svg>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              goToNext()
            }}
            class="absolute right-4 bg-gray-500 bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-colors z-10"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9,18 15,12 9,6"></polyline>
            </svg>
          </button>
        </>
      )}

      <div class="flex items-center justify-center w-full h-full">
        {imageError ? (
          <div class="flex flex-col items-center justify-center text-white text-center">
            <svg
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              class="mb-4 opacity-50"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21,15 16,10 5,21"></polyline>
            </svg>
            <p class="text-lg mb-2">No se pudo cargar la imagen</p>
            <p class="text-sm opacity-75">
              Imagen {currentIndex + 1} de {images.length}
            </p>
          </div>
        ) : (
          <div class="bg-white bg-opacity-5 p-2 rounded-lg backdrop-blur-sm">
            <img
              src={images[currentIndex] || '/placeholder.svg'}
              alt={`Imagen ${currentIndex + 1}`}
              class="max-w-full max-h-[85vh] object-contain rounded shadow-lg"
              onError={handleImageError}
              loading="eager"
            />
          </div>
        )}
      </div>

      {images.length > 1 && (
        <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation()
                setCurrentIndex(index)
              }}
              class={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-white' : 'bg-white bg-opacity-50'
              }`}
            />
          ))}
        </div>
      )}

      <div class="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white text-sm px-3 py-1 rounded-full">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  )
}
