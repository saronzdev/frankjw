import type { JSX } from 'preact'
import down from '@/assets/down.svg'
import { capitalize } from '@/shared/utils'
import styles from '@/styles/CategoryFilter.module.css'

interface Props {
  filterCategory: string
  setFilterCategory: (category: string) => void
  cats: string[]
}

export function CategoryFilter({ filterCategory, setFilterCategory, cats }: Props) {
  const handleCategoryChange = (e: JSX.TargetedEvent<HTMLSelectElement, Event>) => {
    setFilterCategory(e.currentTarget.value)
  }

  return (
    <div className={styles.container}>
      <div className={styles.selectWrapper}>
        <select value={filterCategory} onChange={handleCategoryChange} className={styles.select}>
          <option value="" className={styles.option}>
            Todas las categorías
          </option>
          {cats.map((cat) => (
            <option key={cat} value={cat} className={styles.option}>
              {capitalize(cat)}
            </option>
          ))}
        </select>

        <div className={styles.iconContainer}>
          <img className={styles.icon} src={down} alt="Desplegar Categorías" />
        </div>

        <div className={styles.hoverEffect}></div>
      </div>
    </div>
  )
}
