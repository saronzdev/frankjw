import { useState } from 'preact/hooks'
import { MobileSidebar } from './MobileSidebar'
import Menu from '@/assets/menu.svg'
import { Link } from 'wouter'
import { menuItems, getAuth } from '../shared/utils'

const mI = menuItems
if (getAuth()?.role === 'admin') {
  mI.splice(0, 0, { label: 'Dashboard', href: '/dashboard' })
}

export function Header({ title }: { title: string }) {
  const [isOpen, setOpen] = useState(false)

  const toggleSidebar = () => setOpen(!isOpen)
  return (
    <>
      <header className="sticky p-2 top-0 z-30 bg-black text-white border-b border-gray-800">
        <div className="flex items-center justify-between px-4 py-2">
          <button onClick={toggleSidebar} className="md:hidden p-2 rounded-lg transition-colors">
            <img src={Menu} alt="Menu" className="w-10 h-10" />
          </button>
          <h1 className="text-3xl -ml-2 md:ml-0 tracking-wide flex-1 text-center md:text-left md:flex-none header-title">
            {title}
          </h1>
          <nav className="hidden md:flex items-center space-x-4">
            {mI.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={`${
                  item.href === '/dashboard'
                    ? 'rounded-sm bg-white text-black p-2 mx-4 hover:text-gray-400'
                    : 'hover:text-gray-600'
                } text-md text-semibold transition-colors`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <MobileSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
    </>
  )
}
