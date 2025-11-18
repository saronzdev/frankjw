import { Hero } from '@/components/landing/Hero'
import { Highlighted } from '@/components/landing/Highlighted'
import styles from '@/styles/HomePage.module.css'

export function HomePage() {
  return (
    <main className={styles.main}>
      <Hero />
      <Highlighted />
      <footer className={styles.footer}>
        <a className={styles.a} href="https://saronzdev.vercel.app/" target="_blank">
          Made with ♥️ by saronzdev
        </a>
      </footer>
    </main>
  )
}
