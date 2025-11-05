import { Sample } from './Sample'
import { highlights } from '@/shared/utils'
import styles from '@/styles/Highlighted.module.css'

export function Highlighted() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h3 className={styles.h3}>Para todos los gustos</h3>
        <div className={styles.grid}>
          {highlights.map((item, index) => (
            <Sample key={index} src={item.src} text={item.text} />
          ))}
        </div>
      </div>
    </section>
  )
}
