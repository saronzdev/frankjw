import { useState, useEffect } from 'preact/hooks'
import { getProducts } from '@/shared/fetching'
import { Toaster, toast } from 'sonner'
import logo from '@/assets/logo.jpg'
import { Link } from 'wouter'
import { ContactMe } from './ContactMe'
import { Carousel } from './Carousel'
import type { ProductType } from '@/shared/types'
import { getErrorMessage } from '@/shared/utils'

export function Hero() {
  const [bestSellers, setBestsSeller] = useState<ProductType[]>([])
  const [recents, setRecents] = useState<ProductType[]>([])
  const [_, setLoading] = useState(true)
  const [error, setError] = useState(0)

  useEffect(() => {
    getProducts((data) => setRecents(data.slice(0, 4) as unknown as ProductType[]), setError, setLoading, 'createdAt')
    getProducts((data) => setBestsSeller(data.slice(0, 4) as unknown as ProductType[]), setError, setLoading, 'sales')
  }, [])

  if (error > 0) toast.error(getErrorMessage(error))

  return (
    <section className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      <Toaster richColors position="top-center" />
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-4xl mx-auto text-center mb-16 md:mb-24">
          <div className="flex justify-center mb-8">
            <img src={logo} height={400} width={500} className="rounded-md" />
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl md:text-5xl font-light tracking-tight text-gray-900 leading-tight">
              Momentos Inolvidables
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              No solo vendemos joyas, sino creamos símbolos de emociones y momentos inolvidables.
            </p>
          </div>

          <div className="pt-8">
            <Link
              to="/products"
              className="group inline-flex items-center px-10 py-4 text-lg font-semibold text-white bg-gradient-to-r from-gray-900 to-gray-800 rounded-full hover:from-gray-800 hover:to-gray-700 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
            >
              <p>Ver Productos</p>
              <svg
                className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        <div className="space-y-20 md:space-y-24">
          <Carousel title="Últimos Productos" items={recents} />
          <Carousel title="Los Más Comprados" items={bestSellers} />
        </div>

        <div className="mt-20 md:mt-24 flex justify-center">
          <div className="text-center">
            <h3 className="text-2xl font-light text-gray-800 mb-6">Contáctanos</h3>
            <ContactMe />
          </div>
        </div>
      </div>
    </section>
  )
}
