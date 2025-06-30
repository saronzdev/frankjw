import logo from '@/assets/logo.jpg'
import { Link } from 'wouter'
import { ContactMe } from './ContactMe'

export function Hero() {
  return (
    <section class="min-h-screen flex items-start justify-center px-4 py-2 md:py-20">
      <div class="max-w-4xl mx-auto text-center space-y-2 md:space-y-8">
        <div class="flex justify-center">
          <img
            src={logo}
            alt="Frank Joyería"
            width={400}
            height={200}
            class="rounded-md shadow-sm object-cover"
            loading="eager"
          />
        </div>
        <div className="space-y-2">
          <div>
            <h1 className="text-3xl md:text-5xl tracking-tight text-black">Frank Joyería</h1>
            <p className="mt-2 text-lg text-gray-600 max-w-3xl mx-auto">
              No solo vendemos joyas, sino creamos símbolos de emociones y momentos inolvidables.
            </p>
          </div>
          <div className="mt-12">
            <Link
              to="/products"
              className="inline-flex items-center px-8 py-4 text-lg font-medium text-white bg-black rounded-full hover:bg-gray-800 transition-colors"
            >
              Ver Productos
            </Link>
          </div>
        </div>
        <div className="mt-8 flex justify-center">
          <ContactMe />
        </div>
      </div>
    </section>
  )
}
