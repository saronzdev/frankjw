import { useEffect } from 'preact/hooks'
import { Link } from 'wouter'
import styles from '@/styles/NotFound.module.css'

export function NotFound() {
  useEffect(() => {
    window.history.replaceState(null, '', '/404')
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.numberContainer}>
          <h1 className={styles.number}>404</h1>
        </div>

        <div className={styles.textContainer}>
          <h2 className={styles.title}>Página no encontrada</h2>
          <p className={styles.description}>
            Lo sentimos, la página que buscas no existe o ha sido movida a otra ubicación.
          </p>
        </div>

        <Link to="/" className={styles.homeButton} aria-label="Volver al inicio" title="Volver al inicio">
          Volver al inicio
        </Link>

        <div className={styles.footer}>
          <p className={styles.footerText}>¿Buscabas alguna de estas páginas?</p>
          <div className={styles.footerLinks}>
            <Link to="/about" className={styles.footerLink} aria-label="Ir a Nosotros" title="Nosotros">
              Nosotros
            </Link>
            <Link to="/products" className={styles.footerLink} aria-label="Ir a Productos" title="Productos">
              Productos
            </Link>
            <Link to="/contact" className={styles.footerLink} aria-label="Ir a Contacto" title="Contacto">
              Contacto
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
