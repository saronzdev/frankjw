import styles from '@/styles/ErrorCard.module.css'

interface Props {
  message: string
}

export function ErrorCard({ message }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.content}>
          <div className={styles.iconContainer}>
            <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="15" y1="9" x2="9" y2="15"></line>
              <line x1="9" y1="9" x2="15" y2="15"></line>
            </svg>
          </div>

          <div className={styles.textContent}>
            <h3 className={styles.title}>Error</h3>
            <p className={styles.message}>{message}</p>
          </div>

          <button onClick={() => window.location.reload()} className={styles.button} aria-label="Reintentar">
            Intentar de nuevo
          </button>
        </div>
      </div>
    </div>
  )
}
