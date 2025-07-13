import { ContactMe } from '@/components/Landing/ContactMe'

export function Contact() {
  return (
    <>
      <div class="min-h-screen bg-white">
        <section class="py-20 px-4">
          <div class="max-w-4xl mx-auto text-center">
            <h1 class="text-5xl md:text-6xl font-light tracking-tight text-gray-900 mb-6">Contáctanos</h1>
            <p class="text-xl md:text-2xl text-gray-600 font-light max-w-3xl mx-auto leading-relaxed">
              Estamos aquí para ayudarte a encontrar la joya perfecta o responder cualquier consulta que tengas.
            </p>
          </div>
        </section>

        <div class="mb-8 flex flex-col justify-center items-center space-y-8">
          <div>
            <h2 class="text-2xl font-light text-center text-black mb-6">Información de contacto</h2>
            <div class="space-y-6">
              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span class="text-xl">📞</span>
                </div>
                <div>
                  <h3 class="font-medium text-gray-900 mb-1">Teléfono</h3>
                  <a
                    href="tel:+5353444690"
                    class="text-gray-600 hover:text-gray-900 transition-colors"
                    aria-label="Llamar al teléfono +5353444690"
                    title="Llamar al teléfono"
                  >
                    +5353444690
                  </a>
                </div>
              </div>

              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span class="text-xl">✉️</span>
                </div>
                <div>
                  <h3 class="font-medium text-gray-900 mb-1">Email</h3>
                  <a
                    href="mailto:frankjoyeriacuba@gmail.com"
                    class="text-gray-600 hover:text-gray-900 transition-colors"
                    aria-label="Enviar correo a frankjoyeriacuba@gmail.com"
                    title="Enviar correo"
                  >
                    frankjoyeriacuba@gmail.com
                  </a>
                </div>
              </div>

              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span class="text-xl">📍</span>
                </div>
                <div>
                  <h3 class="font-medium text-gray-900 mb-1">Ubicación</h3>
                  <div class="text-gray-600 space-y-1">
                    <p>
                      <strong>Calle Medio</strong> entre <strong>2 de Mayo</strong> y <strong>América</strong>
                    </p>
                    <p>Matanzas, Cuba</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h3 class="text-lg font-medium text-gray-900 mb-4">Síguenos en redes sociales</h3>
          <ContactMe />
        </div>
      </div>

      <section class="bg-gray-50 rounded-lg p-8 mb-20">
        <div class="text-center mb-8">
          <h2 class="text-2xl font-light text-gray-900 mb-4">Horarios de atención</h2>
          <p class="text-gray-600">Estamos disponibles para atenderte en los siguientes horarios</p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="text-center">
            <h3 class="font-medium text-gray-900 mb-2">Lunes - Viernes</h3>
            <p class="text-gray-600">9:00 AM - 6:00 PM</p>
          </div>
          <div class="text-center">
            <h3 class="font-medium text-gray-900 mb-2">Sábados</h3>
            <p class="text-gray-600">9:00 AM - 4:00 PM</p>
          </div>
          <div class="text-center">
            <h3 class="font-medium text-gray-900 mb-2">Domingos</h3>
            <p class="text-gray-600">Cerrado</p>
          </div>
          <div class="text-center">
            <h3 class="font-medium text-gray-900 mb-2">WhatsApp</h3>
            <p class="text-gray-600">24/7 Disponible</p>
          </div>
        </div>
      </section>

      <section class="text-center">
        <h2 class="text-3xl font-light text-gray-900 mb-4">¿Listo para crear algo especial?</h2>
        <p class="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Contáctanos hoy mismo y descubre cómo podemos ayudarte a crear la joya perfecta para ti o tus seres queridos.
        </p>
        <div class="mb-4">
          <a
            href="https://api.whatsapp.com/send?phone=5353444690"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center px-8 py-4 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors duration-200 font-medium"
            aria-label="Chatear por WhatsApp"
            title="Chatear por WhatsApp"
          >
            Chatear por WhatsApp
          </a>
        </div>
      </section>
    </>
  )
}
