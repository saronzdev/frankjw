import { Gem, Diamond, Sparkles, Palette, Rocket, Heart, TreePine, Check } from 'lucide-preact'

const logo = '/logo.webp'

const PRODUCTS = [
  { icon: Gem, title: 'Anillos & Pulseras', description: 'En metales preciosos con acabados únicos' },
  { icon: Diamond, title: 'Piezas con Gemas', description: 'Diamantes, esmeraldas, rubíes y zafiros' },
  { icon: Sparkles, title: 'Colecciones Exclusivas', description: 'Diseños para ocasiones especiales' },
  { icon: Palette, title: 'Personalización', description: 'Joyas según tus preferencias únicas' }
]

const SERVICES = [
  {
    title: 'Comercialización',
    description:
      'Especialistas en la venta de joyas de oro de diversos kilates y diseños, desde piezas clásicas hasta creaciones contemporáneas.',
    points: ['Materiales certificados', 'Garantías de autenticidad', 'Altos estándares de calidad']
  },
  {
    title: 'Compra de Metales',
    description: 'Adquirimos joyas, monedas y artículos de oro y plata con evaluación precisa y precios justos.',
    points: ['Evaluación transparente', 'Precios competitivos', 'Proceso confiable']
  },
  {
    title: 'Fabricación',
    description:
      'Talleres especializados donde diseñamos y producimos joyas personalizadas con técnicas tradicionales y modernas.',
    points: ['Diseños únicos', 'Trabajo bajo pedido', 'Acabados impecables']
  },
  {
    title: 'Reparación',
    description: 'Servicios profesionales de reparación, limpieza y mantenimiento para preservar el valor de tus joyas.',
    points: ['Restauración completa', 'Limpieza profesional', 'Ajustes precisos']
  }
]

const VALUES = [
  { icon: Rocket, title: 'Innovación', description: 'Diseño vanguardista que marca tendencias' },
  { icon: Heart, title: 'Compromiso', description: 'Satisfacción total del cliente' },
  { icon: TreePine, title: 'Responsabilidad', description: 'Procesos sociales y ambientalmente responsables' }
]

export function About() {
  return (
    <main class="min-h-dvh bg-surface">
      <section class="border-b border-line bg-gradient-to-b from-surface-2 to-bg px-4 py-14 md:py-18">
        <div class="mx-auto max-w-2xl text-center">
          <h1 class="font-display text-[2rem] font-semibold uppercase tracking-[0.05em] text-ink sm:text-[2.5rem]">
            Nuestra Historia
          </h1>
          <p class="mt-4 text-lg leading-relaxed text-ink-soft">
            Creamos símbolos de emociones y momentos inolvidables, consolidándonos como una elección confiable y
            aspiracional en el mercado de la joyería.
          </p>
        </div>
      </section>

      <div class="mx-auto flex max-w-6xl flex-col gap-16 px-4 py-16 md:py-20">
        <section class="grid items-center gap-8 md:grid-cols-2 md:gap-12">
          <div class="flex flex-col gap-4">
            <h2 class="font-display text-2xl font-semibold tracking-[0.05em] text-ink sm:text-3xl">Frank Joyería</h2>
            <p class="leading-relaxed text-ink-soft">
              Somos una mediana empresa privada manufacturera especializada en el diseño, elaboración y comercialización
              de joyas de alta calidad.
            </p>
            <p class="leading-relaxed text-ink-soft">
              Con años de experiencia en el sector, nos destacamos por fusionar la artesanía tradicional con innovadoras
              técnicas de producción, creando piezas únicas que reflejan elegancia, sofisticación y estilo.
            </p>
          </div>
          <div class="overflow-hidden rounded-lg border border-line shadow-sm">
            <img
              src={logo}
              alt="Taller de joyería"
              class="aspect-3/2 w-full object-cover"
              width={600}
              height={400}
              fetchPriority="high"
            />
          </div>
        </section>

        <section class="flex flex-col gap-8">
          <header class="text-center">
            <h2 class="font-display text-2xl font-semibold tracking-[0.05em] text-ink sm:text-3xl">Nuestros Productos</h2>
            <p class="mt-2 text-ink-muted">Ofrecemos una amplia gama de joyería fina para cada ocasión especial</p>
          </header>
          <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PRODUCTS.map(({ icon: Icon, title, description }) => (
              <div class="flex flex-col items-center gap-3 rounded-lg border border-line p-6 text-center transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-md">
                <div class="grid h-12 w-12 place-items-center rounded-full bg-gold-soft text-gold-deep">
                  <Icon size={22} aria-hidden="true" />
                </div>
                <h3 class="font-display text-lg text-ink">{title}</h3>
                <p class="text-sm text-ink-muted">{description}</p>
              </div>
            ))}
          </div>
        </section>

        <section class="flex flex-col gap-8">
          <header class="text-center">
            <h2 class="font-display text-2xl font-semibold tracking-[0.05em] text-ink sm:text-3xl">Nuestros Servicios</h2>
            <p class="mt-2 text-ink-muted">Actividades especializadas que garantizan calidad y satisfacción</p>
          </header>
          <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map(({ title, description, points }) => (
              <div class="flex flex-col gap-3 rounded-lg border border-line p-6">
                <h3 class="font-display text-lg text-ink">{title}</h3>
                <p class="text-sm leading-relaxed text-ink-muted">{description}</p>
                <ul class="mt-auto flex flex-col gap-1.5">
                  {points.map((point) => (
                    <li key={point} class="flex items-center gap-2 text-sm text-ink-soft">
                      <Check size={14} class="shrink-0 text-gold-deep" aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section class="flex flex-col gap-8">
          <header class="text-center">
            <h2 class="font-display text-2xl font-semibold tracking-[0.05em] text-ink sm:text-3xl">Nuestros Valores</h2>
          </header>
          <div class="grid gap-4 sm:grid-cols-3">
            {VALUES.map(({ icon: Icon, title, description }) => (
              <div class="flex flex-col items-center gap-3 rounded-lg border border-line p-6 text-center transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-md">
                <div class="grid h-12 w-12 place-items-center rounded-full bg-gold-soft text-gold-deep">
                  <Icon size={22} aria-hidden="true" />
                </div>
                <h3 class="font-display text-lg text-ink">{title}</h3>
                <p class="text-sm text-ink-muted">{description}</p>
              </div>
            ))}
          </div>
        </section>

        <section class="rounded-lg bg-gold-soft/60 px-6 py-10 text-center md:px-12">
          <h2 class="font-display text-2xl font-semibold tracking-[0.05em] text-ink">Compromiso de Calidad</h2>
          <p class="mx-auto mt-4 max-w-3xl leading-relaxed text-ink-soft">
            En Frank Joyería, garantizamos excelencia en cada etapa del proceso: desde la selección de materias primas
            hasta el control de calidad final. Nuestro equipo de diseñadores y orfebres combina creatividad y precisión
            para asegurar que cada pieza cumpla con los más altos estándares.
          </p>
        </section>
      </div>
    </main>
  )
}
