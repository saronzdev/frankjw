import { mostRecents } from '@/shared/signals'
import { Link } from 'wouter'
import { ArrowRight, Mail } from 'lucide-preact'
import { Carousel } from './Carousel'
import heroLogo from '@/assets/hero-logo.webp'

export function Hero() {
  return (
    <>
      <section class="border-b border-line bg-gradient-to-b from-surface-2 to-bg">
        <div class="mx-auto max-w-7xl px-4 py-10 sm:py-14 lg:py-16">
          <div class="mx-auto flex max-w-3xl flex-col items-center text-center">
            <img
              src={heroLogo}
              alt="Frank Joyería"
              width={920}
              height={784}
              fetchPriority="high"
              class="h-auto w-[14rem] sm:w-[16rem] lg:w-[18rem]"
            />

            <div class="mt-6 flex flex-col gap-4 sm:mt-8">
              <h1 class="font-display text-[2rem] font-semibold uppercase leading-tight tracking-[0.05em] text-ink sm:text-[2.75rem] lg:text-[3.5rem]">
                Diseño y Excelencia
              </h1>
              <p class="mx-auto max-w-xl text-lg leading-relaxed text-ink-soft sm:text-xl">
                Joyas cuidadosamente elaboradas para acompañarte en cada capítulo de tu vida
              </p>
            </div>

            <div class="mt-8 flex flex-wrap justify-center gap-3 sm:mt-10">
              <Link
                to="/products"
                class="inline-flex h-12 items-center gap-2 rounded-md bg-ink px-8 font-medium tracking-[0.02em] text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-stone-700 hover:shadow-md"
              >
                Ver Colecciones
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link
                to="/contact"
                class="inline-flex h-12 items-center gap-2 rounded-md border border-ink bg-transparent px-8 font-medium tracking-[0.02em] text-ink transition-all hover:-translate-y-0.5 hover:bg-surface-2"
              >
                Contáctanos
                <Mail size={18} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section class="flex flex-col gap-12 bg-surface px-4 py-16 md:gap-16 md:py-20">
        <div class="mx-auto w-full max-w-6xl">
          <Carousel title="Últimos Productos" items={mostRecents.value} />
        </div>
      </section>
    </>
  )
}
