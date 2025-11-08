import { mostRecents } from '@/shared/signals'
import { Link } from 'wouter'
import { Carousel } from './Carousel'
import styles from '@/styles/Hero.module.css'
const logo = '/logo.webp'

export function Hero() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <div className={styles.logoContainer}>
              <img
                src={logo}
                fetchPriority="high"
                className={styles.logo}
                alt="Frank Joyería Logo"
                width={300}
                height={200}
              />
            </div>
            <div className={styles.textContent}>
              <h2 className={styles.title}>Diseño y Excelencia</h2>
              <p className={styles.description}>
                Joyas cuidadosamente elaboradas para acompañarte en cada capítulo de tu vida
              </p>
            </div>

            <div className={styles.buttonContainer}>
              <Link to="/products" className={styles.ctaButton}>
                <p className={styles.buttonText}>Ver Colecciones</p>
                <svg className={styles.buttonIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link to="/contact" className={styles.ctaButtonSecondary}>
                <p className={styles.buttonText}>Contáctanos</p>
                <svg className={styles.buttonIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.carouselsSection}>
        <div className={styles.container}>
          <Carousel title="Últimos Productos" items={mostRecents.value} />
        </div>
      </section>
    </>
  )
}
