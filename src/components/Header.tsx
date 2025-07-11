import { useState } from 'preact/hooks'
import { MobileSidebar } from './MobileSidebar'
import { Link, useLocation } from 'wouter'
import Menu from '@/assets/menu.svg'
import { menuItems, titles } from '@/shared/utils'
import { isAdmin } from '@/shared/signals'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [location] = useLocation()

  const toggleSidebar = () => setIsOpen(!isOpen)

  return (
    <>
      <header className="sticky top-0 z-30 bg-gradient-to-r from-black via-gray-900 to-black text-white border-b border-yellow-600/20 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <button
              onClick={toggleSidebar}
              className="md:hidden p-2 rounded-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-yellow-600/20 hover:to-gray-800/20 hover:scale-105"
              aria-label="Abrir menú"
            >
              <img className="w-6 h-6" src={Menu} />
            </button>

            <h1 className="text-3xl -ml-2 font-bold tracking-wide flex-1 text-center md:text-left md:flex-none bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent">
              {titles[location as keyof typeof titles] || 'Frank Joyería'}
            </h1>

            <nav className="hidden md:flex items-center space-x-2">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`${
                    item.href === '/dashboard'
                      ? `${
                          isAdmin.value ? 'block' : 'hidden'
                        } bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-4 py-2 rounded-lg hover:from-yellow-500 hover:to-yellow-700 font-semibold`
                      : 'text-white hover:text-yellow-200 hover:bg-white/10 px-4 py-2 rounded-lg font-medium'
                  } transition-all duration-300 transform hover:scale-105`}
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
