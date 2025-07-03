import { menuItemsMobile } from '../shared/utils'
import X from '@/assets/close.svg'

export function MobileSidebar({ isOpen, isAdmin, toggle }: { isOpen: boolean; isAdmin: boolean; toggle: () => void }) {
  return (
    <>
      {isOpen && <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggle} />}

      <div
        className={`md:hidden fixed top-0 left-0 h-full w-64 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-xl font-semibold text-black">Menú</h2>
          <button onClick={toggle} className="p-1 rounded-lg">
            <img className="w-8 h-8" src={X} />
          </button>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItemsMobile.map((item, index) => (
              <li key={index}>
                <a
                  href={item.href}
                  className={`${
                    item.href === '/dashboard' && !isAdmin ? 'hidden' : 'flex'
                  } items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200`}
                  onClick={toggle}
                >
                  <img className="w-5 h-5" src={item.icon} />
                  <span className="font-medium">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  )
}
