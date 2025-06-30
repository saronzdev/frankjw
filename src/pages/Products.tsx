import { useState, useEffect } from 'preact/hooks'
import { getCats } from '../shared/fetching'
import { Category } from '../components/Products/Category'
import { Header } from '../components/Header'

export function Products() {
  const [cats, setCats] = useState<string[]>([])
  const [error, setError] = useState(0)
  const [loading, setLoading] = useState(true)
  const [filterCategory, setFilterCategory] = useState('')

  useEffect(() => {
    getCats(setCats, setError, setLoading)
  }, [])

  if (loading) return <p className="mt-4 text-center text-lg">Cargando...</p>
  if (error > 0) return <p className="mt-4 text-red-700 text-center text-lg">Ocurrió un error en el servidor</p>

  return (
    <div className="min-h-screen flex flex-col">
      <Header title="Productos" />
      <section>
        <div className="flex justify-center">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory((e.target as HTMLSelectElement).value)}
            className="text-black w-72 m-4 py-2 rounded-lg border border-gray-500 focus:outline-none focus:border-black"
          >
            <option value="">Todas</option>
            {cats.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-4">
          {cats
            .filter((item) => !filterCategory || filterCategory.includes(item))
            .map((item) => (
              <Category key={item} category={item} />
            ))}
        </div>
      </section>
    </div>
  )
}
