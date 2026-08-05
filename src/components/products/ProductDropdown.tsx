import { useState, useEffect, useRef } from 'preact/hooks'
import type { JSX } from 'preact'
import { Link } from 'wouter'
import { cats } from '@/shared/signals'
import { normalize, slugify } from '@/shared/utils'
import down from '@/assets/down.svg'
import styles from '@/styles/ProductDropdown.module.css'

interface Props {
  /** Renderiza el botón que abre el dropdown (recibe toggle y estado). */
  trigger: (toggle: () => void, isOpen: boolean) => JSX.Element
  /** Callback extra al navegar a una categoría. */
  onNavigate?: () => void
  className?: string
}

export function ProductDropdown({ trigger, onNavigate, className }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const toggle = () => setIsOpen((prev) => !prev)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className={`${styles.wrapper} ${className ?? ''}`} ref={dropdownRef}>
      {trigger(toggle, isOpen)}

      {isOpen && (
        <div className={styles.dropdown}>
          <ul className={styles.list}>
            {cats.value.map((category) => (
              <li key={category} className={styles.item}>
                <Link
                  to={`/products/${slugify(category)}`}
                  className={styles.link}
                  onClick={() => {
                    setIsOpen(false)
                    onNavigate?.()
                  }}
                >
                  {normalize(category)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export { down as DropdownIcon }