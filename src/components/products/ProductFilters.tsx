import styles from '@/styles/ProductFilters.module.css'

interface Props {
  priceRange: [number, number]
  selectedKarats: number[]
  onSale: boolean
  onPriceChange: (range: [number, number]) => void
  onKaratsChange: (karats: number[]) => void
  onSaleChange: (onSale: boolean) => void
  onReset: () => void
}

const commonKarats = [10, 14, 18, 24]

export function ProductFilters({
  priceRange,
  selectedKarats,
  onSale,
  onPriceChange,
  onKaratsChange,
  onSaleChange,
  onReset
}: Props) {
  const handleKaratToggle = (karat: number) => {
    if (selectedKarats.includes(karat)) {
      onKaratsChange(selectedKarats.filter((k) => k !== karat))
    } else {
      onKaratsChange([...selectedKarats, karat])
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Filtros</h3>
        <button className={styles.reset} onClick={onReset}>
          Limpiar
        </button>
      </div>

      {/* Rango de precio */}
      <div className={styles.section}>
        <label className={styles.label}>Precio (USD)</label>
        <div className={styles.priceInputs}>
          <input
            type="number"
            className={styles.input}
            placeholder="Mín"
            value={priceRange[0] || ''}
            onChange={(e) => onPriceChange([Number((e.target as HTMLInputElement).value) || 0, priceRange[1]])}
            min="0"
          />
          <input
            type="number"
            className={styles.input}
            placeholder="Máx"
            value={priceRange[1] || ''}
            onChange={(e) => onPriceChange([priceRange[0], Number((e.target as HTMLInputElement).value) || 0])}
            min="0"
          />
        </div>
      </div>

      {/* Kilates */}
      <div className={styles.section}>
        <label className={styles.label}>Kilates</label>
        <div className={styles.checkboxGroup}>
          {commonKarats.map((karat) => (
            <label key={karat} className={styles.checkbox}>
              <input type="checkbox" checked={selectedKarats.includes(karat)} onChange={() => handleKaratToggle(karat)} />
              <span>{karat}K</span>
            </label>
          ))}
        </div>
      </div>

      {/* En oferta */}
      <div className={styles.section}>
        <label className={styles.checkbox}>
          <input type="checkbox" checked={onSale} onChange={(e) => onSaleChange((e.target as HTMLInputElement).checked)} />
          <span>Solo productos en oferta</span>
        </label>
      </div>
    </div>
  )
}
