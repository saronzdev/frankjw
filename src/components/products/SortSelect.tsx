import styles from '@/styles/SortSelect.module.css'
import sortIcon from '@/assets/sort.svg'
interface Props {
  value: string
  onChange: (value: string) => void
}

export function SortSelect({ value, onChange }: Props) {
  return (
    <div className={styles.container}>
      <img src={sortIcon} alt="Sort icon" height={20} width={20} />
      <select className={styles.select} value={value} onChange={(e) => onChange((e.target as HTMLSelectElement).value)}>
        <option value="default">Últimos</option>
        <option value="name">Nombre (A-Z)</option>
        <option value="price-asc">Precio ↑</option>
        <option value="price-desc">Precio ↓</option>
        <option value="weight">Peso ↓</option>
      </select>
    </div>
  )
}
