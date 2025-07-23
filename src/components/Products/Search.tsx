import type { JSX } from 'preact'
import close from '@/assets/close.svg'
import search from '@/assets/search.svg'
import styles from '@/styles/Search.module.css'

interface Props {
  searchTerm: string
  setSearchTerm: (value: string) => void
  handlerSearch: (term: string) => void
  placeholder: string
}

export function Search({ searchTerm, setSearchTerm, handlerSearch, placeholder }: Props) {
  const handleInputChange = (e: JSX.TargetedEvent<HTMLInputElement, Event>) => {
    handlerSearch(e.currentTarget.value)
  }

  const clearSearch = () => {
    setSearchTerm('')
    handlerSearch('')
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.inputContainer}>
          <input
            className={styles.input}
            type="text"
            placeholder={placeholder}
            onChange={handleInputChange}
            value={searchTerm}
          />

          <div className={styles.searchIconContainer}>
            <img className={styles.searchIcon} src={search} alt="Icono de Buscar" />
          </div>

          {searchTerm && (
            <button className={styles.clearButton} onClick={clearSearch} type="button" aria-label="Limpiar búsqueda">
              <img className={styles.clearIcon} src={close} alt="Icono de Limpiar Búsqueda" />
            </button>
          )}
        </div>

        <div className={styles.hoverEffect}></div>
      </div>
    </div>
  )
}
