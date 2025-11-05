import styles from '@/styles/Sample.module.css'

interface Props {
  text: string
  src: string
}

export function Sample({ text, src }: Props) {
  return (
    <main className={styles.main}>
      <div className={styles.imgctn}>
        <img src={src} alt={`Producto ${text}`} className={styles.img} loading="lazy" />
      </div>
      <h4 className={styles.h4}>{text}</h4>
    </main>
  )
}
