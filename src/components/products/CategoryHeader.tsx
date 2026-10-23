interface Props {
  title: string
  image: string
  description: string
}

/** Tarjeta de encabezado compacta para la vista de una categoría: texto a la izquierda, foto a la derecha (sin cortes en desktop). */
export function CategoryHeader({ title, image, description }: Props) {
  return (
    <section class="overflow-hidden rounded-lg border border-line bg-surface md:flex md:min-h-56 md:items-stretch">
      <div class="shrink-0 md:order-2 md:w-[33%]">
        <img
          src={image}
          alt=""
          fetchPriority="high"
          class="h-32 w-full object-cover sm:h-40 md:h-full"
        />
      </div>
      <div class="flex flex-col justify-center gap-1.5 p-4 md:order-1 md:w-[67%] md:px-7 md:py-6">
        <h1 class="font-display text-lg font-semibold uppercase tracking-[0.05em] text-ink md:text-2xl">
          {title}
        </h1>
        <p class="max-w-2xl text-sm leading-relaxed text-ink-soft md:text-[0.95rem]">{description}</p>
      </div>
    </section>
  )
}
