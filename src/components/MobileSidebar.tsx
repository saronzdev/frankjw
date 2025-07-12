import { menuItemsMobile } from '@/shared/utils'
import X from '@/assets/close.svg'

interface MobileSidebarProps {
  isOpen: boolean
  isAdmin: boolean | null
  toggle: () => void
}

export function MobileSidebar({ isOpen, isAdmin, toggle }: MobileSidebarProps) {
  return (
    <>
      {isOpen && <div className="md:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm" onClick={toggle} />}

      <div
        className={`md:hidden fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-6">
          <h2 className="text-xl font-bold">Menú</h2>
          <button onClick={toggle} className="p-2 rounded-lg hover:bg-white/20 transition-colors" aria-label="Cerrar menú">
            <img className="w-6 h-6" src={X} />
          </button>
        </div>

        <nav className="p-6">
          <ul className="space-y-3">
            {menuItemsMobile.map((item) => {
              const isDashboard = item.href === '/dashboard'

              if (isDashboard && !isAdmin) return null

              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="flex items-center gap-4 p-4 rounded-xl transition-all duration-200 group text-gray-700 hover:bg-gray-100 hover:text-yellow-600"
                    onClick={toggle}
                  >
                    <img
                      className={`w-5 h-5 ${isDashboard ? 'text-white' : 'group-hover:text-yellow-600'}`}
                      src={item.icon}
                    />
                    <span className="font-medium">{item.label}</span>
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center">© 2025 Frank Joyería</p>
        </div>
      </div>
    </>
  )
}
