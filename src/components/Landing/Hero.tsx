import { bestSellers, mostRecents, error } from '@/shared/signals'
import { Toaster, toast } from 'sonner'
import { Link } from 'wouter'
import { ContactMe } from './ContactMe'
import { Carousel } from './Carousel'
import { getErrorMessage } from '@/shared/utils'

export function Hero() {
  if (error.value > 0) toast.error(getErrorMessage(error.value))

  return (
    <section className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      <Toaster richColors position="top-center" />
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="min-h-screen max-w-4xl mx-auto text-center -mb-8">
          <div className="flex justify-center mb-8">
            <div style={{ width: 300, height: 240 }} className="flex items-center justify-center rounded-md bg-white">
              <img
                src="/logo.webp"
                width={300}
                height={240}
                fetchPriority="high"
                className="rounded-md object-contain w-[300px] h-[240px] block"
                alt="Frank Joyería Logo"
              />
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl md:text-5xl font-normal uppercase tracking-tight text-gray-900 leading-tight">
              Tu joyería de confianza
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
          <Carousel title="Últimos Productos" items={mostRecents.value} />
          <Carousel title="Los Más Comprados" items={bestSellers.value} />
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
