import { useState, useEffect } from 'preact/hooks'
import { getCats } from '@/shared/fetching'
import { Category } from '@/components/Products/Category'
import { CategoryFilter } from '@/components/Products/CategoryFilter'
import { ErrorCard } from '@/components/Products/ErrorCard'
import { LoadingCard } from '@/components/Products/LoadigCard'
import { getErrorMessage } from '@/shared/utils'
import { NotProducts } from '@/components/Products/NotProducts'

export function Products() {
  const [cats, setCats] = useState<string[]>([])
  const [error, setError] = useState(0)
  const [loading, setLoading] = useState(true)
  const [filterCategory, setFilterCategory] = useState('')

  useEffect(() => {
    getCats(setCats, setError, setLoading)
  }, [])

  if (loading) return <LoadingCard />
  if (error > 0) {
    if (error === 1101) return <NotProducts hasProducts={false} />
    return <ErrorCard message={getErrorMessage(error)} />
  }

  if (filterCategory && cats.filter((cat) => cat === filterCategory).length === 0) {
    return <NotProducts hasProducts={cats.length > 0} />
  }

  return (
    <div className="min-h-screen flex flex-col">
      <section>
        <div className="mt-4 flex justify-center">
          <CategoryFilter filterCategory={filterCategory} setFilterCategory={setFilterCategory} cats={cats} />
        </div>
        <div className="space-y-4 mb-4">
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
