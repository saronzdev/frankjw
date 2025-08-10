import { bestSellers, mostRecents } from '@/shared/signals'
import { Link } from 'wouter'
import { Social } from './Social'
import { Carousel } from './Carousel'
import styles from '@/styles/Hero.module.css'
const logo = '/logo.webp'

export function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.heroContent}>
          <div className={styles.logoContainer}>
            <img src={logo} fetchPriority="high" className={styles.logo} alt="Frank Joyería Logo" width={300} height={200} />
          </div>
          <div className={styles.textContent}>
            <h2 className={styles.title}>Tu joyería de confianza</h2>
            <p className={styles.description}>
              No solo vendemos joyas, sino creamos símbolos de emociones y momentos inolvidables.
            </p>
          </div>

          <div className={styles.buttonContainer}>
            <Link to="/products" className={styles.ctaButton}>
              <p className={styles.buttonText}>Ver Productos</p>
              <svg className={styles.buttonIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        <div className={styles.carouselsSection}>
          <Carousel title="Últimos Productos" items={mostRecents.value} />
          <Carousel title="Los Más Comprados" items={bestSellers.value} />
        </div>

        <div className={styles.contactSection}>
          <div className={styles.contactContent}>
            <h3 className={styles.contactTitle}>Contáctanos</h3>
            <Social />
          </div>
        </div>
      </div>
    </section>
  )
}
