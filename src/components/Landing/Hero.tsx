import logo from '@/assets/logo.jpg'
import { Link } from 'wouter'
import { ContactMe } from './ContactMe'
import { Carousel } from './Carousel'

const bestSellers = [
  { id: 1, name: 'Anillo Compromiso Oro', image: 'https://placehold.co/200', price: '$1,200' },
  { id: 2, name: 'Collar Perlas Clásico', image: 'https://placehold.co/200', price: '$850' },
  { id: 3, name: 'Pulsera Diamantes', image: 'https://placehold.co/200', price: '$2,100' },
  { id: 4, name: 'Aretes Oro Blanco', image: 'https://placehold.co/200', price: '$650' },
  { id: 5, name: 'Reloj Elegante', image: 'https://placehold.co/200', price: '$3,200' }
]

const newArrivals = [
  { id: 6, name: 'Anillo Moderno Plata', image: 'https://placehold.co/200', price: '$420' },
  { id: 7, name: 'Collar Tendencia 2024', image: 'https://placehold.co/200', price: '$780' },
  { id: 8, name: 'Pulsera Minimalista', image: 'https://placehold.co/200', price: '$320' },
  { id: 9, name: 'Aretes Contemporáneos', image: 'https://placehold.co/200', price: '$540' },
  { id: 10, name: 'Cadena Oro Rosa', image: 'https://placehold.co/200', price: '$890' }
]

export function Hero() {
  return (
    <section className="min-h-screen flex items-start justify-center px-4 py-4 md:py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-4xl mx-auto text-center space-y-2 md:space-y-8">
        <div className="flex justify-center">
          <div className="relative">
            <img
              src={logo}
              alt="Frank Joyería"
              width={400}
              height={200}
              className="rounded-md shadow-lg object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 rounded-md bg-gradient-to-t from-yellow-400/10 to-transparent pointer-events-none" />
          </div>
        </div>
        <div className="space-y-2">
          <div>
            <h1 className="hidden md:block p-2 text-5xl text-center tracking-tight bg-gradient-to-r from-gray-900 via-yellow-600 to-gray-900 bg-clip-text text-transparent">
              Frank Joyería
            </h1>
            <p className="mt-2 text-lg text-gray-600 max-w-3xl mx-auto">
              No solo vendemos joyas, sino creamos símbolos de emociones y momentos inolvidables.
            </p>
          </div>
          <div className="mt-12 mb-20">
            <Link
              to="/products"
              className="inline-flex items-center px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-yellow-600 to-yellow-700 rounded-full hover:from-yellow-700 hover:to-yellow-800 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Ver Productos
            </Link>
          </div>
        </div>
        <div className="w-full max-w-6xl mx-auto space-y-16">
          <Carousel title="Últimos Productos" items={newArrivals} />
          <Carousel title="Los Más Comprados" items={bestSellers} />
        </div>
        <div className="mt-8 flex justify-center">
          <ContactMe />
        </div>
      </div>
    </section>
  )
}
