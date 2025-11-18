import styles from '@/styles/SortSelect.module.css'

interface Props {
  value: string
  onChange: (value: string) => void
}

export function SortSelect({ value, onChange }: Props) {
  return (
    <div className={styles.container}>
      <label className={styles.label}>Ordenar por:</label>
      <select className={styles.select} value={value} onChange={(e) => onChange((e.target as HTMLSelectElement).value)}>
        <option value="default">Más recientes</option>
        <option value="name">Nombre (A-Z)</option>
        <option value="price-asc">Precio - menor a mayor</option>
        <option value="price-desc">Precio - mayor a menor</option>
        <option value="weight">Peso - mayor a menor</option>
      </select>
    </div>
  )
}
