import { Header } from '../components/Header'
import ring from '@/assets/ring.svg'
import diamond from '@/assets/diamond.svg'
import sparkles from '@/assets/sparkles.svg'
import palette from '@/assets/palette.svg'
import rocket from '@/assets/rocket.svg'
import heart from '@/assets/heart.svg'
import tree from '@/assets/tree.svg'

export function About() {
  return (
    <div class="min-h-screen bg-white">
      <section class="py-20 px-4">
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="text-5xl md:text-6xl font-light tracking-tight text-gray-900 mb-6">Nuestra Historia</h1>
          <p class="text-xl md:text-2xl text-gray-600 font-light max-w-3xl mx-auto leading-relaxed">
            Creamos símbolos de emociones y momentos inolvidables, consolidándonos como una elección confiable y aspiracional
            en el mercado de la joyería.
          </p>
        </div>
      </section>

      <div class="max-w-6xl mx-auto px-4 pb-20">
        <section class="mb-20">
          <div class="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 class="text-3xl font-light text-gray-900 mb-6">Frank Joyería</h2>
              <p class="text-lg text-gray-700 leading-relaxed mb-6">
                Somos una mediana empresa privada manufacturera especializada en el diseño, elaboración y comercialización de
                joyas de alta calidad.
              </p>
              <p class="text-lg text-gray-700 leading-relaxed">
                Con años de experiencia en el sector, nos destacamos por fusionar la artesanía tradicional con innovadoras
                técnicas de producción, creando piezas únicas que reflejan elegancia, sofisticación y estilo.
              </p>
            </div>
            <div class="flex justify-center">
              <img
                src="/placeholder.svg?height=300&width=300"
                alt="Taller de joyería"
                class="rounded-lg shadow-sm"
                width={300}
                height={300}
              />
            </div>
          </div>
        </section>

        <section class="mb-20">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-light text-gray-900 mb-4">Nuestros Productos</h2>
            <p class="text-lg text-gray-600 max-w-2xl mx-auto">
              Ofrecemos una amplia gama de joyería fina para cada ocasión especial
            </p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div class="text-center p-6 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <img src={ring} alt="Anillo" class="w-12 h-12" />
              </div>
              <h3 class="text-lg font-medium text-gray-900 mb-2">Anillos & Pulseras</h3>
              <p class="text-gray-600 text-sm">En metales preciosos con acabados únicos</p>
            </div>

            <div class="text-center p-6 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <img src={diamond} alt="Diamante" class="w-12 h-12" />
              </div>
              <h3 class="text-lg font-medium text-gray-900 mb-2">Piezas con Gemas</h3>
              <p class="text-gray-600 text-sm">Diamantes, esmeraldas, rubíes y zafiros</p>
            </div>

            <div class="text-center p-6 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <img src={sparkles} alt="Sparkles" class="w-12 h-12" />
              </div>
              <h3 class="text-lg font-medium text-gray-900 mb-2">Colecciones Exclusivas</h3>
              <p class="text-gray-600 text-sm">Diseños para ocasiones especiales</p>
            </div>

            <div class="text-center p-6 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <img src={palette} alt="Palette" class="w-12 h-12" />
              </div>
              <h3 class="text-lg font-medium text-gray-900 mb-2">Personalización</h3>
              <p class="text-gray-600 text-sm">Joyas según tus preferencias únicas</p>
            </div>
          </div>
        </section>

        <section class="mb-20">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-light text-gray-900 mb-4">Nuestros Servicios</h2>
            <p class="text-lg text-gray-600 max-w-2xl mx-auto">
              Actividades especializadas que garantizan calidad y satisfacción
            </p>
          </div>

          <div class="grid md:grid-cols-2 gap-8">
            <div class="bg-gray-50 p-8 rounded-lg">
              <h3 class="text-xl font-medium text-gray-900 mb-4">Comercialización</h3>
              <p class="text-gray-700 mb-4">
                Especialistas en la venta de joyas de oro de diversos quilates y diseños, desde piezas clásicas hasta
                creaciones contemporáneas.
              </p>
              <ul class="text-gray-600 space-y-2">
                <li>• Materiales certificados</li>
                <li>• Garantías de autenticidad</li>
                <li>• Altos estándares de calidad</li>
              </ul>
            </div>

            <div class="bg-gray-50 p-8 rounded-lg">
              <h3 class="text-xl font-medium text-gray-900 mb-4">Compra de Metales</h3>
              <p class="text-gray-700 mb-4">
                Adquirimos joyas, monedas y artículos de oro y plata con evaluación precisa y precios justos.
              </p>
              <ul class="text-gray-600 space-y-2">
                <li>• Evaluación transparente</li>
                <li>• Precios competitivos</li>
                <li>• Proceso confiable</li>
              </ul>
            </div>

            <div class="bg-gray-50 p-8 rounded-lg">
              <h3 class="text-xl font-medium text-gray-900 mb-4">Fabricación</h3>
              <p class="text-gray-700 mb-4">
                Talleres especializados donde diseñamos y producimos joyas personalizadas con técnicas tradicionales y
                modernas.
              </p>
              <ul class="text-gray-600 space-y-2">
                <li>• Diseños únicos</li>
                <li>• Trabajo bajo pedido</li>
                <li>• Acabados impecables</li>
              </ul>
            </div>

            <div class="bg-gray-50 p-8 rounded-lg">
              <h3 class="text-xl font-medium text-gray-900 mb-4">Reparación</h3>
              <p class="text-gray-700 mb-4">
                Servicios profesionales de reparación, limpieza y mantenimiento para preservar el valor de tus joyas.
              </p>
              <ul class="text-gray-600 space-y-2">
                <li>• Restauración completa</li>
                <li>• Limpieza profesional</li>
                <li>• Ajustes precisos</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section class="mb-20">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-light text-gray-900 mb-4">Nuestros Valores</h2>
          </div>

          <div class="grid md:grid-cols-3 gap-8">
            <div class="text-center">
              <div class="w-20 h-20 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <img src={rocket} alt="Rocket" class="w-12 h-12" />
              </div>
              <h3 class="text-lg font-medium text-gray-900 mb-3">Innovación</h3>
              <p class="text-gray-600">Diseño vanguardista que marca tendencias</p>
            </div>

            <div class="text-center">
              <div class="w-20 h-20 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <img src={heart} alt="Heart" class="w-12 h-12" />
              </div>
              <h3 class="text-lg font-medium text-gray-900 mb-3">Compromiso</h3>
              <p class="text-gray-600">Satisfacción total del cliente</p>
            </div>

            <div class="text-center">
              <div class="w-20 h-20 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <img src={tree} alt="Tree" class="w-12 h-12" />
              </div>
              <h3 class="text-lg font-medium text-gray-900 mb-3">Responsabilidad</h3>
              <p class="text-gray-600">Procesos sociales y ambientalmente responsables</p>
            </div>
          </div>
        </section>

        {/* Quality Commitment */}
        <section class="bg-gray-50 rounded-lg p-12 text-center">
          <h2 class="text-3xl font-light text-gray-900 mb-6">Compromiso de Calidad</h2>
          <p class="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            En Frank Joyería, garantizamos excelencia en cada etapa del proceso: desde la selección de materias primas hasta
            el control de calidad final. Nuestro equipo de diseñadores y orfebres combina creatividad y precisión para
            asegurar que cada pieza cumpla con los más altos estándares.
          </p>
        </section>
      </div>
    </div>
  )
}
