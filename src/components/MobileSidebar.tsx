import { useState, useEffect, useRef } from 'preact/hooks'
import { menuItemsMobile, normalize } from '@/shared/utils'
import { cats } from '@/shared/signals'
import X from '@/assets/close.svg'
import down from '@/assets/down.svg'
import { Link } from 'wouter'
import styles from '@/styles/MobileSidebar.module.css'

interface Props {
  isOpen: boolean
  isAdmin: boolean | null
  toggle: () => void
}

export function MobileSidebar({ isOpen, isAdmin, toggle }: Props) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <>
      {isOpen && <div className={styles.overlay} onClick={toggle} />}

      <div className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.header}>
          <h2 className={styles.headerTitle}>Menú</h2>
          <button onClick={toggle} className={styles.closeButton} aria-label="Cerrar menú">
            <img className={styles.closeIcon} src={X} alt="Icono de Cerrar Menú" />
          </button>
        </div>

        <nav className={styles.nav}>
          <ul className={styles.navList}>
            {menuItemsMobile.map((item) => {
              if (item.href === '/dashboard' && !isAdmin) return null

              if (item.href === '/products') {
                return (
                  <li key={item.href} className={styles.navItem}>
                    <div className={styles.productsDropdown} ref={dropdownRef}>
                      <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className={`${styles.navLink} ${styles.productsTrigger} ${isDropdownOpen ? styles.open : ''}`}
                        aria-expanded={isDropdownOpen}
                        aria-haspopup="true"
                      >
                        <img
                          className={`${styles.navIcon} ${styles.navIconHover}`}
                          src={item.icon}
                          alt={`${item.label} icono`}
                        />
                        <span className={styles.navLabel}>{item.label}</span>
                        <img
                          src={down}
                          alt=""
                          className={`${styles.dropdownIcon} ${isDropdownOpen ? styles.rotated : ''}`}
                        />
                      </button>

                      {isDropdownOpen && (
                        <div className={styles.dropdown}>
                          <ul className={styles.dropdownList}>
                            {cats.value.map((category) => (
                              <li key={category} className={styles.dropdownItem}>
                                <Link
                                  to={`/products?category=${encodeURIComponent(category)}`}
                                  className={styles.dropdownLink}
                                  onClick={() => {
                                    setIsDropdownOpen(false)
                                    toggle()
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
                  </li>
                )
              }

              return (
                <li key={item.href} className={styles.navItem}>
                  <Link href={item.href} className={styles.navLink} onClick={toggle} aria-label={`Ir a ${item.label}`}>
                    <img
                      className={`${styles.navIcon} ${styles.navIconHover}`}
                      src={item.icon}
                      alt={`${item.label} icono`}
                    />
                    <span className={styles.navLabel}>{item.label}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className={styles.footer}>
          <p className={styles.footerText}>© 2025 Frank Joyería</p>
        </div>
      </div>
    </>
  )
}
