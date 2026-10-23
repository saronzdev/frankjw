import { socialLinks } from '@/shared/utils'

export function Social() {
  return (
    <nav class="flex flex-wrap gap-3" aria-label="Redes sociales">
      {socialLinks.map(({ icon, name, href }) => (
        <a
          key={name}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={name}
          title={name}
          class="grid h-11 w-11 place-items-center rounded-md border border-line text-ink-soft transition-[border-color,background-color] duration-200 hover:border-gold/60 hover:bg-gold-soft/60"
        >
          <img className="h-5 w-5" src={icon} alt={`Icono de ${name}`} loading="lazy" />
        </a>
      ))}
    </nav>
  )
}
