export function NotFound() {
  window.history.replaceState(null, '', '/404')
  return (
    <div class="min-h-screen bg-white flex items-center justify-center px-4">
      <div class="max-w-2xl mx-auto text-center">
        <div class="mb-8">
          <h1 class="text-9xl md:text-[12rem] font-light text-gray-200 leading-none select-none">404</h1>
        </div>

        <div class="space-y-6 mb-12">
          <h2 class="text-3xl md:text-4xl font-light text-gray-900">Página no encontrada</h2>
          <p class="text-lg md:text-xl text-gray-600 max-w-lg mx-auto leading-relaxed">
            Lo sentimos, la página que buscas no existe o ha sido movida a otra ubicación.
          </p>
        </div>

        <a
          href="/"
          class="inline-flex items-center px-8 py-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
        >
          Volver al inicio
        </a>

        <div class="mt-16 pt-8 border-t border-gray-100">
          <p class="text-sm text-gray-500 mb-4">¿Buscabas alguna de estas páginas?</p>
          <div class="flex flex-wrap justify-center gap-6 text-sm">
            <a href="/about" class="text-gray-600 hover:text-gray-900 transition-colors">
              Nosotros
            </a>
            <a href="/products" class="text-gray-600 hover:text-gray-900 transition-colors">
              Productos
            </a>
            <a href="/contact" class="text-gray-600 hover:text-gray-900 transition-colors">
              Contacto
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
