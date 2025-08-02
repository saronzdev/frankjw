import { useState } from 'preact/hooks'
import { MobileSidebar } from './MobileSidebar'
import { Link, useLocation } from 'wouter'
import Menu from '@/assets/menu.svg'
import { menuItems, titles } from '@/shared/utils'
import { isAdmin } from '@/shared/signals'
import styles from '@/styles/Header.module.css'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [location] = useLocation()

  const toggleSidebar = () => setIsOpen(!isOpen)

  return (
    <>
      <header className={styles.header} id="header">
        <div className={styles.container}>
          <div className={styles.headerContent}>
            <button onClick={toggleSidebar} className={styles.menuButton} aria-label="Abrir menú">
              <img className={styles.menuIcon} src={Menu} alt="Menú lateral" />
            </button>

            <h1 className={styles.title}>{titles[location as keyof typeof titles] || 'Frank Joyería'}</h1>

            <nav className={styles.nav}>
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  aria-label={`Ir a ${item.label}`}
                  className={`${
                    item.href === '/dashboard' ? `${isAdmin.value ? styles.dashboardLink : styles.hidden}` : styles.navLink
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>
      <MobileSidebar isOpen={isOpen} toggle={toggleSidebar} isAdmin={isAdmin.value} />
    </>
  )
}
