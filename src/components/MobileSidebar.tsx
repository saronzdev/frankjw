import Home from '@/assets/home.svg'
import Products from '@/assets/products.svg'
import About from '@/assets/about.svg'
import Contact from '@/assets/contact.svg'
import X from '@/assets/close.svg'
import Dashboard from '@/assets/dashboard.svg'
import { menuItems } from '../shared/utils'

const mI = menuItems.map((item) => ({
  ...item,
  icon:
    item.href === '/'
      ? Home
      : item.href === '/products'
      ? Products
      : item.href === '/about'
      ? About
      : item.href === '/contact'
      ? Contact
      : item.href === '/dashboard'
      ? Dashboard
      : Home
}))

export function MobileSidebar(props: { isOpen: boolean; toggleSidebar: () => void }) {
  return (
    <>
      {props.isOpen && <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={props.toggleSidebar} />}

      <div
        className={`md:hidden fixed top-0 left-0 h-full w-64 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          props.isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-xl font-semibold text-black">Menú</h2>
          <button onClick={props.toggleSidebar} className="p-1 rounded-lg">
            <img className="w-8 h-8" src={X} />
          </button>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            {mI.map((item, index) => (
              <li key={index}>
                <a
                  href={item.href}
                  className="flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                  onClick={props.toggleSidebar}
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
