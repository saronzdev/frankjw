import { useState, useRef, useEffect } from 'preact/hooks'
import styles from '@/styles/SortSelect.module.css'
import downIcon from '@/assets/down.svg'

interface Option {
  value: string
  label: string
}

interface Props {
  value: string
  onChange: (value: string) => void
}

const options: Option[] = [
  { value: 'default', label: 'Más recientes' },
  { value: 'name', label: 'Nombre (A-Z)' },
  { value: 'price-asc', label: 'Precio - menor a mayor' },
  { value: 'price-desc', label: 'Precio - mayor a menor' },
  { value: 'weight', label: 'Peso - mayor a menor' }
]

export function SortSelect({ value, onChange }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const selectedOption = options.find((opt) => opt.value === value)
  const selectedLabel = selectedOption?.label || 'Más recientes'

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleSelect = (optionValue: string) => {
    onChange(optionValue)
    setIsOpen(false)
  }

  return (
    <div className={styles.container} ref={dropdownRef}>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className={styles.label}>Orden: </span>
        <span className={styles.value}>{selectedLabel}</span>
        <img src={downIcon} alt="" className={`${styles.icon} ${isOpen ? styles.iconOpen : ''}`} />
      </button>

      {isOpen && (
        <ul className={styles.dropdown} role="listbox">
          {options.map((option) => (
            <li
              key={option.value}
              className={`${styles.option} ${value === option.value ? styles.optionSelected : ''}`}
              onClick={() => handleSelect(option.value)}
              role="option"
              aria-selected={value === option.value}
            >
              {value === option.value && <span className={styles.checkmark}>✓</span>}
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
