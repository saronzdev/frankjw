import { useState, useEffect } from 'preact/hooks'
import left from '@/assets/left.svg'
import right from '@/assets/right.svg'

interface CarouselItem {
  id: number
  image: string
  name: string
  price: string
}

interface CarouselProps {
  title: string
  items: CarouselItem[]
}
export function Carousel({ title, items }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [items.length])

  const goTo = (index: number) => setCurrentIndex(index)
  const goToPrev = () => setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)
  const goToNext = () => setCurrentIndex((prev) => (prev + 1) % items.length)

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h3 className="text-2xl md:text-3xl font-light text-center mb-6 text-gray-800">{title}</h3>

      <div className="relative group">
        <div className="overflow-hidden rounded-xl bg-white shadow-lg">
          <div
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {items.map((item) => (
              <div key={item.id} className="w-full flex-shrink-0 relative">
                <img src={item.image} alt={item.name} className="w-full h-48 md:h-64 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h4 className="text-lg font-semibold">{item.name}</h4>
                  <p className="text-sm opacity-90">{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={goToPrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
        >
          <img className="w-5 h-5" src={left} />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
        >
          <img className="w-5 h-5" src={right} />
        </button>
      </div>

      <div className="flex justify-center mt-4 space-x-2">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex ? 'bg-gray-800 scale-125' : 'bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
