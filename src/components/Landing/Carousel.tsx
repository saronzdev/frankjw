import { useState, useEffect } from 'preact/hooks'
import noImage from '@/assets/no-image.svg'
import left from '@/assets/left.svg'
import right from '@/assets/right.svg'

interface CarouselItem {
  id: number
  pictures: string[]
  name: string
  price: string
}

interface CarouselProps {
  title: string
  items: CarouselItem[]
}

export function Carousel({ title, items }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const products = items.map((i) => ({ ...i, pictures: i.pictures && i.pictures.length > 0 ? i.pictures : [noImage] }))

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [items.length])

  const navigate = (direction: 'prev' | 'next') => {
    setCurrentIndex((prev) => (direction === 'next' ? (prev + 1) % items.length : (prev - 1 + items.length) % items.length))
  }

  return (
    <div className="w-full max-w-5xl mx-auto">
      <h3 className="text-2xl md:text-3xl font-light text-center mb-8 text-gray-800">{title}</h3>

      <div className="relative group">
        <div className="overflow-hidden rounded-2xl shadow-xl">
          <div
            className="flex transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {products.map((p) => (
              <div key={p.id} className="w-full flex-shrink-0 relative">
                <img src={p.pictures[0]} alt={p.name} className="w-full h-56 md:h-96 object-contain object-center" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h4 className="text-xl font-semibold mb-1">{p.name}</h4>
                  <p className="text-lg font-medium text-yellow-300">{p.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => navigate('prev')}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg hover:scale-110"
        >
          <img className="w-5 h-5" src={left} />
        </button>

        <button
          onClick={() => navigate('next')}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg hover:scale-110"
        >
          <img className="w-5 h-5" src={right} />
        </button>
      </div>

      <div className="flex justify-center mt-6 space-x-3">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-yellow-600 scale-125 shadow-lg' : 'bg-gray-300 hover:bg-gray-400 hover:scale-110'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
