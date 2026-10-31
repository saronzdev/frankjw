import { useState, useEffect } from 'preact/hooks'
import type { ProductType } from '@/types'
import noImage from '@/assets/no-image.svg'
import { ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-preact'
import { Link } from 'wouter'
import { optimizeImage, buildSrcSet, slugify } from '@/shared/utils'
import { IconButton } from '@/ui/IconButton'
import { cx } from '@/ui/cx'

interface Props {
  title: string
  items: ProductType[]
}

const AUTOPLAY_MS = 4000
const REDUCED_MOTION = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches

export function Carousel({ title, items }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [paused, setPaused] = useState(REDUCED_MOTION)

  const slides = items.map((i) => {
    let pictures = noImage
    if (i.pictures && i.pictures.length > 0) {
      if (i.pictures.length > 1) pictures = i.pictures[1]
      else pictures = i.pictures[0]
    }
    return { ...i, pictures }
  })

  useEffect(() => {
    if (items.length === 0 || paused) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length)
    }, AUTOPLAY_MS)
    return () => clearInterval(interval)
  }, [items.length, paused])

  const navigate = (direction: 'prev' | 'next') => {
    setCurrentIndex((prev) =>
      direction === 'next' ? (prev + 1) % items.length : (prev - 1 + items.length) % items.length
    )
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      navigate('prev')
    } else if (e.key === 'ArrowRight') {
      navigate('next')
    }
  }

  const current = slides[currentIndex]

  if (items.length === 0) {
    return (
      <section aria-busy="true" aria-label={title} class="flex flex-col gap-12">
        <h2 class="mb-8 text-center font-display text-2xl font-medium tracking-wide text-ink sm:mb-10 sm:text-3xl">
          {title}
        </h2>
        <div class="relative">
          <div class="overflow-hidden rounded-lg shadow-lg md:rounded-xl">
            <div class="min-w-full aspect-4/3 bg-surface-2 animate-pulse motion-reduce:animate-none sm:aspect-3/2 md:aspect-16/9 lg:aspect-2/1" />
          </div>
        </div>
        <span class="sr-only">Cargando últimos productos</span>
      </section>
    )
  }

  return (
    <section
      role="region"
      aria-roledescription="carousel"
      aria-label={title}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <h2 class="mb-8 text-center font-display text-2xl font-medium tracking-wide text-ink sm:mb-10 sm:text-3xl">
        {title}
      </h2>

      <div class="relative">
        <div class="overflow-hidden rounded-lg shadow-lg md:rounded-xl">
          <div
            class="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {slides.map((p, i) => (
              <div
                key={p.id}
                class="relative min-w-full aspect-4/3 bg-surface sm:aspect-3/2 md:aspect-16/9 lg:aspect-2/1"
                aria-hidden={i !== currentIndex}
              >
                <img
                  src={optimizeImage(p.pictures, 1200)}
                  srcSet={buildSrcSet(p.pictures, [480, 800, 1200, 1600])}
                  sizes="(min-width: 1024px) 1200px, 90vw"
                  alt={p.description}
                  class="absolute inset-0 h-full w-full object-contain object-center"
                  loading={i === 0 ? 'eager' : 'lazy'}
                  fetchPriority={i === 0 ? 'high' : undefined}
                  decoding="async"
                />
                <div class="absolute bottom-3 right-3 sm:bottom-5 sm:right-5">
                  <Link
                    to={`/products/${slugify(p.category ?? '')}`}
                    aria-hidden={i !== currentIndex}
                    tabIndex={i === currentIndex ? undefined : -1}
                    class="inline-flex items-center gap-2 rounded-md bg-ink px-4 py-2.5 font-medium text-white shadow-md transition-transform hover:-translate-y-0.5 hover:bg-stone-700 sm:px-5 sm:py-3"
                  >
                    <ShoppingBag size={17} aria-hidden="true" />
                    Ver
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <IconButton
          label="Diapositiva anterior"
          onClick={() => navigate('prev')}
          class="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/85 shadow-sm md:h-10 md:w-10"
        >
          <ChevronLeft size={18} aria-hidden="true" />
        </IconButton>
        <IconButton
          label="Siguiente diapositiva"
          onClick={() => navigate('next')}
          class="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/85 shadow-sm md:h-10 md:w-10"
        >
          <ChevronRight size={18} aria-hidden="true" />
        </IconButton>
      </div>

      {current && (
        <p class="sr-only" aria-hidden="false">
          Diapositiva {currentIndex + 1} de {slides.length}: {current.description}
        </p>
      )}

      <div class="mt-3 flex justify-center gap-1.5" role="tablist" aria-label="Elegir diapositiva">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => goToSlide(index)}
            aria-label={`Ir a la diapositiva ${index + 1}`}
            aria-current={index === currentIndex}
            class={cx(
              'h-2 w-2 rounded-full transition-colors duration-200',
              index === currentIndex ? 'bg-gold' : 'bg-ink-muted/30 hover:bg-ink-muted/60'
            )}
          />
        ))}
      </div>
    </section>
  )
}
