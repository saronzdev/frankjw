interface Props {
  title: string
  image: string
  description: string
}

/** Banner compacto para la vista de una categoría específica. */
export function CategoryHeader({ title, image, description }: Props) {
  return (
    <section class="relative flex min-h-44 items-end overflow-hidden rounded-lg md:min-h-56">
      <img
        src={image}
        alt={title}
        loading="lazy"
        decoding="async"
        class="absolute inset-0 h-full w-full object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
      <div class="relative z-10 flex flex-col gap-1.5 p-5 md:p-7">
        <h1 class="font-display text-[1.65rem] font-semibold uppercase tracking-[0.05em] text-white md:text-3xl">
          {title}
        </h1>
        <p class="max-w-xl text-sm leading-relaxed text-white/85 md:text-[0.95rem]">{description}</p>
      </div>
    </section>
  )
}
