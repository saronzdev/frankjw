import { useState } from 'preact/hooks'
import { MobileSidebar } from './MobileSidebar'
import { Link, useLocation } from 'wouter'
import { ProductDropdown, DropdownIcon } from './products/ProductDropdown'
import Menu from '@/assets/menu.svg'
import { menuItems, titles } from '@/shared/utils'
import { isAdmin, logout } from '@/shared/signals'
import styles from '@/styles/Header.module.css'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [location, setLocation] = useLocation()

  const handleLogout = async () => {
    await logout()
    setLocation('/')
  }

  return (
    <>
      <header className={styles.header} id="header">
        <div className={styles.container}>
          <div className={styles.headerContent}>
            <button onClick={() => setIsOpen(!isOpen)} className={styles.menuButton} aria-label="Abrir menú">
              <img className={styles.menuIcon} src={Menu} alt="Menú lateral" />
            </button>

            <h1 className={styles.title}>{titles[location as keyof typeof titles] || 'Frank Joyería'}</h1>

            <nav className={styles.nav}>
              {menuItems.map((item) => {
                if (item.href === '/products') {
                  return (
                    <ProductDropdown
                      key={item.href}
                      className={styles.productsDropdown}
                      trigger={(toggle, isOpen) => (
                        <button
                          onClick={toggle}
                          className={`${styles.navLink} ${styles.productsTrigger} ${isOpen ? styles.open : ''}`}
                          aria-expanded={isOpen}
                          aria-haspopup="true"
                        >
                          {item.label}
                          <img
                            src={DropdownIcon}
                            alt=""
                            className={`${styles.dropdownIcon} ${isOpen ? styles.rotated : ''}`}
                          />
                        </button>
                      )}
                    />
                  )
                }

                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    aria-label={`Ir a ${item.label}`}
                    aria-current={location === item.href ? 'page' : undefined}
                    className={
                      item.href === '/dashboard' ? (isAdmin.value ? styles.dashboardLink : styles.hidden) : styles.navLink
                    }
                  >
                    {item.label}
                  </Link>
                )
              })}
              {isAdmin.value && (
                <button onClick={handleLogout} className={styles.logoutButton} aria-label="Cerrar sesión">
                  Salir
                </button>
              )}
            </nav>
          </div>
        </div>
      </header>
      <MobileSidebar isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} isAdmin={isAdmin.value} />
    </>
  )
}