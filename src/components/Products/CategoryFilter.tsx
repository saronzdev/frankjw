import type { JSX } from 'preact'
import down from '@/assets/down.svg'
import { capitalize } from '@/shared/utils'

interface CategoryFilterProps {
  filterCategory: string
  setFilterCategory: (category: string) => void
  cats: string[]
}

export function CategoryFilter({ filterCategory, setFilterCategory, cats }: CategoryFilterProps) {
  const handleCategoryChange = (e: JSX.TargetedEvent<HTMLSelectElement, Event>) => {
    setFilterCategory(e.currentTarget.value)
  }

  return (
    <div className="flex justify-center mb-8">
      <div className="relative">
        <select
          value={filterCategory}
          onChange={handleCategoryChange}
          className="appearance-none bg-white text-gray-800 w-80 px-6 py-4 pr-12 rounded-2xl border-2 border-gray-200 focus:outline-none focus:border-yellow-500 focus:ring-4 focus:ring-yellow-100 transition-all duration-300 shadow-sm hover:shadow-md font-medium text-lg cursor-pointer"
        >
          <option value="" className="py-2">
            Todas las categorías
          </option>
          {cats.map((cat) => (
            <option key={cat} value={cat} className="py-2">
              {capitalize(cat)}
            </option>
          ))}
        </select>

        <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
          <img className="w-5 h-5 text-gray-500" src={down} />
        </div>

        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 opacity-0 hover:opacity-20 transition-opacity duration-300 pointer-events-none -z-10 blur-sm"></div>
      </div>
    </div>
  )
}
