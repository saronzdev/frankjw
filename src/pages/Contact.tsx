import { ContactMe } from '../components/Landing/ContactMe'

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

        <div class="max-w-6xl mx-auto px-4 pb-20">
          <div class="grid lg:grid-cols-2 gap-16 mb-20">
            <div class="bg-gray-50 p-8 rounded-lg">
              <h2 class="text-2xl font-light text-gray-900 mb-6">Envíanos un mensaje</h2>
              <form class="space-y-6">
                <div class="grid md:grid-cols-2 gap-4">
                  <div>
                    <label for="firstName" class="block text-sm font-medium text-gray-700 mb-2">
                      Nombre
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all"
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div>
                    <label for="lastName" class="block text-sm font-medium text-gray-700 mb-2">
                      Apellido
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all"
                      placeholder="Tu apellido"
                    />
                  </div>
                </div>

                <div>
                  <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all"
                    placeholder="tu@email.com"
                  />
                </div>

                <div>
                  <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all"
                    placeholder="+53"
                  />
                </div>

                <div>
                  <label for="subject" class="block text-sm font-medium text-gray-700 mb-2">
                    Asunto
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all"
                  >
                    <option value="">Selecciona un asunto</option>
                    <option value="consultation">Consulta general</option>
                    <option value="custom">Joya personalizada</option>
                    <option value="repair">Reparación</option>
                    <option value="purchase">Compra de oro/plata</option>
                    <option value="other">Otro</option>
                  </select>
                </div>

                <div>
                  <label for="message" class="block text-sm font-medium text-gray-700 mb-2">
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all resize-none"
                    placeholder="Cuéntanos cómo podemos ayudarte..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  class="w-full bg-gray-900 text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors duration-200 font-medium"
                >
                  Enviar mensaje
                </button>
              </form>
            </div>

            <div class="space-y-8">
              <div>
                <h2 class="text-2xl font-light text-gray-900 mb-6">Información de contacto</h2>
                <div class="space-y-6">
                  <div class="flex items-start space-x-4">
                    <div class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span class="text-xl">📞</span>
                    </div>
                    <div>
                      <h3 class="font-medium text-gray-900 mb-1">Teléfono</h3>
                      <a href="tel:+5353444690" class="text-gray-600 hover:text-gray-900 transition-colors">
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
                      <a href="mailto:frankjoyeria91@gmail.com" class="text-gray-600 hover:text-gray-900 transition-colors">
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
                        <p>Calle Media entre Jovellanos y América</p>
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
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://api.whatsapp.com/send?phone=5352921813"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center px-8 py-4 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors duration-200 font-medium"
              >
                Chatear por WhatsApp
              </a>
              <a
                href="tel:+5352921813"
                class="inline-flex items-center px-8 py-4 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors duration-200 font-medium"
              >
                Llamar ahora
              </a>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
