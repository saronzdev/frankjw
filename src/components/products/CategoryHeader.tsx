import styles from '@/styles/CategoryHeader.module.css'

interface Props {
  title: string
  image: string
  description: string
}

export function CategoryHeader({ title, image, description }: Props) {
  return (
    <div className={styles.container}>
      <img src={image} alt={title} className={styles.picture} loading="lazy" decoding="async" />
      <div className={styles.textOverlay}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  )
}
