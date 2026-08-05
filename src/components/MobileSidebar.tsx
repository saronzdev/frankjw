import { menuItemsMobile } from '@/shared/utils'
import { ProductDropdown, DropdownIcon } from './products/ProductDropdown'
import X from '@/assets/close.svg'
import { Link } from 'wouter'
import styles from '@/styles/MobileSidebar.module.css'

interface Props {
  isOpen: boolean
  isAdmin: boolean | null
  toggle: () => void
}

export function MobileSidebar({ isOpen, isAdmin, toggle }: Props) {
  const year = new Date().getFullYear()

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
                    <ProductDropdown
                      className={styles.wrapper}
                      onNavigate={toggle}
                      trigger={(toggleDropdown, isOpen) => (
                        <button
                          onClick={toggleDropdown}
                          className={`${styles.navLink} ${styles.productsTrigger} ${isOpen ? styles.open : ''}`}
                          aria-expanded={isOpen}
                          aria-haspopup="true"
                        >
                          <img
                            className={`${styles.navIcon} ${styles.navIconHover}`}
                            src={item.icon}
                            alt={`${item.label} icono`}
                          />
                          <span className={styles.navLabel}>{item.label}</span>
                          <img
                            src={DropdownIcon}
                            alt=""
                            className={`${styles.dropdownIcon} ${isOpen ? styles.rotated : ''}`}
                          />
                        </button>
                      )}
                    />
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
          <p className={styles.footerText}>© {year} Frank Joyería</p>
        </div>
      </div>
    </>
  )
}