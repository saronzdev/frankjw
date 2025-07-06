import type { JSX } from 'preact'
import close from '@/assets/close.svg'
import search from '@/assets/search.svg'

interface Props {
  searchTerm: string
  setSearchTerm: (value: string) => void
  handlerSearch: (term: string) => void
  placeholder: string
}

export function Search({ searchTerm, setSearchTerm, handlerSearch, placeholder }: Props) {
  const handleInputChange = (e: JSX.TargetedEvent<HTMLInputElement, Event>) => {
    handlerSearch(e.currentTarget.value)
  }

  const clearSearch = () => {
    setSearchTerm('')
    handlerSearch('')
  }

  return (
    <div className="flex justify-center mb-8">
      <div className="relative">
        <div className="relative">
          <input
            className="appearance-none bg-white text-gray-800 w-80 px-6 py-4 pl-14 pr-12 rounded-2xl border-2 border-gray-200 focus:outline-none focus:border-yellow-500 focus:ring-4 focus:ring-yellow-100 transition-all duration-300 shadow-sm hover:shadow-md font-medium text-lg placeholder-gray-400"
            type="text"
            placeholder={placeholder}
            onChange={handleInputChange}
            value={searchTerm}
          />

          {/* Search icon */}
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <img className="w-5 h-5 text-gray-500" src={search} />
          </div>

          {/* Clear button */}
          {searchTerm && (
            <button
              className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
              onClick={clearSearch}
              type="button"
            >
              <img className="w-5 h-5" src={close} />
            </button>
          )}
        </div>

        {/* Decorative gradient border */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 opacity-0 hover:opacity-20 transition-opacity duration-300 pointer-events-none -z-10 blur-sm"></div>
      </div>
    </div>
  )
}
