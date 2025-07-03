import { useState } from 'preact/hooks'
import { MobileSidebar } from './MobileSidebar'
import { Link, useLocation } from 'wouter'
import Menu from '@/assets/menu.svg'
import { menuItems, titles } from '../shared/utils'

export function Header({ isAdmin = false }: { isAdmin?: boolean }) {
  const [location] = useLocation()
  const [isOpen, setOpen] = useState(false)

  const toggleSidebar = () => setOpen(!isOpen)

  return (
    <>
      <header className="sticky p-2 top-0 z-30 bg-gradient-to-r from-black via-gray-900 to-black text-white border-b border-yellow-600/20">
        <div className="flex items-center justify-between px-4 py-2">
          <button
            onClick={toggleSidebar}
            className="md:hidden p-2 rounded-lg transition-colors hover:bg-gradient-to-r hover:from-yellow-600/20 hover:to-gray-800/20"
            aria-label="Abrir menú"
          >
            <img src={Menu} alt="Menu" className="w-10 h-10" />
          </button>

          <h1 className="text-3xl -ml-2 md:ml-0 tracking-wide flex-1 text-center md:text-left md:flex-none bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent">
            {titles[location as keyof typeof titles]}
          </h1>

          <nav className="hidden md:flex items-center space-x-4">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={`${
                  item.href === '/dashboard'
                    ? `${
                        isAdmin ? 'block' : 'hidden'
                      } rounded-sm bg-gradient-to-r from-yellow-400 to-yellow-600 text-black p-2 mx-2 hover:from-yellow-500 hover:to-yellow-700`
                    : 'hover:text-yellow-200 hover:bg-white/5 px-3 py-1 rounded-md'
                } text-md font-semibold transition-all duration-300`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <MobileSidebar isOpen={isOpen} toggle={toggleSidebar} isAdmin={isAdmin} />
    </>
  )
}
