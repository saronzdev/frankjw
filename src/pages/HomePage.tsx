import { Hero } from '@/components/Landing/Hero'
import { Highlighted } from '@/components/Landing/Highlighted'
import styles from '@/styles/HomePage.module.css'

export function HomePage() {
  return (
    <main className={styles.main}>
      <Hero />
      <Highlighted />
      <footer className={styles.footer}>Made with ♥️ by saronzdev</footer>
    </main>
  )
}
