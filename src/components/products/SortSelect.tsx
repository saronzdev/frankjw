import styles from '@/styles/SortSelect.module.css'

interface Props {
  value: string
  onChange: (value: string) => void
}

export function SortSelect({ value, onChange }: Props) {
  return (
    <div className={styles.container}>
      <label className={styles.label}>Orden:</label>
      <select className={styles.select} value={value} onChange={(e) => onChange((e.target as HTMLSelectElement).value)}>
        <option value="default">Últimos</option>
        <option value="name">Nombre (A-Z)</option>
        <option value="price-asc">Precio ⭡</option>
        <option value="price-desc">Precio ⭣</option>
        <option value="weight">Peso ⭣</option>
      </select>
    </div>
  )
}
