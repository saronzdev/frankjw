import { socialLinks } from '@/shared/utils'
import styles from '@/styles/Social.module.css'

export function Social() {
  return (
    <nav className={styles.nav}>
      {socialLinks.map(({ icon, name, href }) => (
        <a key={name} href={href} target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label={name}>
          <img className={styles.socialIcon} src={icon} alt={`Icono de ${name}`} loading="lazy" />
        </a>
      ))}
    </nav>
  )
}
