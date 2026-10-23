import { Sample } from './Sample'
import { highlights } from '@/shared/utils'

export function Highlighted() {
  return (
    <section class="bg-gradient-to-b from-surface-2 to-surface px-4 py-16 sm:py-20">
      <div class="mx-auto max-w-6xl">
        <h2 class="mb-10 text-center font-display text-2xl font-medium tracking-wide text-ink sm:mb-12 sm:text-3xl">
          Para todos los gustos
        </h2>
        <div class="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {highlights.map((item) => (
            <Sample key={item.src} src={item.src} srcSet={item.srcSet} text={item.text} />
          ))}
        </div>
      </div>
    </section>
  )
}
