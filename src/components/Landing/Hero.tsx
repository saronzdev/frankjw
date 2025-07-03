import logo from '@/assets/logo.jpg'
import { Link } from 'wouter'
import { ContactMe } from './ContactMe'
import { Carousel } from './Carousel'
const latestProducts = [
  {
    id: 1,
    image: 'https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=800',
    name: 'Anillo de Compromiso Diamante',
    price: '$1,200'
  },
  {
    id: 2,
    image: 'https://images.pexels.com/photos/1191536/pexels-photo-1191536.jpeg?auto=compress&cs=tinysrgb&w=800',
    name: 'Collar de Perlas Clásico',
    price: '$850'
  },
  {
    id: 3,
    image: 'https://images.pexels.com/photos/1721934/pexels-photo-1721934.jpeg?auto=compress&cs=tinysrgb&w=800',
    name: 'Pulsera de Oro Rosa',
    price: '$650'
  },
  {
    id: 4,
    image: 'https://images.pexels.com/photos/1191538/pexels-photo-1191538.jpeg?auto=compress&cs=tinysrgb&w=800',
    name: 'Aretes de Esmeralda',
    price: '$950'
  },
  {
    id: 5,
    image: 'https://images.pexels.com/photos/1721932/pexels-photo-1721932.jpeg?auto=compress&cs=tinysrgb&w=800',
    name: 'Reloj de Lujo Clásico',
    price: '$2,400'
  }
]

const bestSellers = [
  {
    id: 1,
    image: 'https://images.pexels.com/photos/1191537/pexels-photo-1191537.jpeg?auto=compress&cs=tinysrgb&w=800',
    name: 'Anillo de Boda Clásico',
    price: '$780'
  },
  {
    id: 2,
    image: 'https://images.pexels.com/photos/1721936/pexels-photo-1721936.jpeg?auto=compress&cs=tinysrgb&w=800',
    name: 'Pendientes de Diamante',
    price: '$1,350'
  },
  {
    id: 3,
    image: 'https://images.pexels.com/photos/1191533/pexels-photo-1191533.jpeg?auto=compress&cs=tinysrgb&w=800',
    name: 'Cadena de Oro 18k',
    price: '$1,150'
  },
  {
    id: 4,
    image: 'https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=800',
    name: 'Pulsera de Diamantes',
    price: '$2,100'
  },
  {
    id: 5,
    image: 'https://images.pexels.com/photos/1721934/pexels-photo-1721934.jpeg?auto=compress&cs=tinysrgb&w=800',
    name: 'Collar de Esmeraldas',
    price: '$1,850'
  }
]

export function Hero() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
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
            <button className="group inline-flex items-center px-10 py-4 text-lg font-semibold text-white bg-gradient-to-r from-gray-900 to-gray-800 rounded-full hover:from-gray-800 hover:to-gray-700 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl">
              <Link to="/products">Ver Productos</Link>
              <svg
                className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <div className="space-y-20 md:space-y-24">
          <Carousel title="Últimos Productos" items={latestProducts} />
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
