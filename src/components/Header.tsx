import { useState, useEffect, useRef } from 'preact/hooks'
import { MobileSidebar } from './MobileSidebar'
import { Link, useLocation } from 'wouter'
import Menu from '@/assets/menu.svg'
import down from '@/assets/down.svg'
import { menuItems, titles, normalize, slugify } from '@/shared/utils'
import { isAdmin, cats } from '@/shared/signals'
import styles from '@/styles/Header.module.css'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [location] = useLocation()
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
                    <div key={item.href} className={styles.productsDropdown} ref={dropdownRef}>
                      <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className={`${styles.navLink} ${styles.productsTrigger} ${isDropdownOpen ? styles.open : ''}`}
                        aria-expanded={isDropdownOpen}
                        aria-haspopup="true"
                      >
                        {item.label}
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
                                  to={`/products/${slugify(category)}`}
                                  className={styles.dropdownLink}
                                  onClick={() => setIsDropdownOpen(false)}
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

                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    aria-label={`Ir a ${item.label}`}
                    className={
                      item.href === '/dashboard' ? (isAdmin.value ? styles.dashboardLink : styles.hidden) : styles.navLink
                    }
                  >
                    {item.label}
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>
      </header>
      <MobileSidebar isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} isAdmin={isAdmin.value} />
    </>
  )
}
