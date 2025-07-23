import { menuItemsMobile } from '@/shared/utils'
import X from '@/assets/close.svg'
import { Link } from 'wouter'
import styles from '@/styles/MobileSidebar.module.css'

interface Props {
  isOpen: boolean
  isAdmin: boolean | null
  toggle: () => void
}

export function MobileSidebar({ isOpen, isAdmin, toggle }: Props) {
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
              const isDashboard = item.href === '/dashboard'

              if (isDashboard && !isAdmin) return null

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
