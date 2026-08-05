import styles from '@/styles/LoadingCard.module.css'

export function LoadingCard() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.innerContent}>
          <div className={styles.spinner}></div>
          <p className={styles.text}>Cargando...</p>
        </div>
      </div>
    </div>
  )
}
