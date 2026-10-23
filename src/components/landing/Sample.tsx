interface Props {
  text: string
  src: string
  srcSet?: string
}

export function Sample({ text, src, srcSet }: Props) {
  return (
    <figure class="group overflow-hidden rounded-lg border border-line bg-surface shadow-sm transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div class="overflow-hidden">
        <img
          src={src}
          srcSet={srcSet}
          sizes="(min-width: 1024px) 373px, (min-width: 640px) 50vw, calc(100vw - 2rem)"
          alt=""
          loading="lazy"
          decoding="async"
          class="aspect-square w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </div>
      <figcaption class="px-5 py-4 text-center">
        <p class="font-display text-lg text-ink">{text}</p>
        <p class="mt-1 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-ink-muted">Frank Joyería</p>
      </figcaption>
    </figure>
  )
}
