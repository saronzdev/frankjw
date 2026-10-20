interface Props {
  text: string
  src: string
}

export function Sample({ text, src }: Props) {
  return (
    <figure class="group overflow-hidden rounded-lg border border-line bg-surface shadow-sm transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div class="overflow-hidden">
        <img
          src={src}
          alt={text}
          loading="lazy"
          decoding="async"
          class="aspect-4/5 w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </div>
      <figcaption class="px-5 py-4 text-center">
        <p class="font-display text-lg text-ink">{text}</p>
        <p class="mt-1 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-ink-muted">Frank Joyería</p>
      </figcaption>
    </figure>
  )
}
