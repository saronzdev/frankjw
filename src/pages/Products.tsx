import { useState } from 'preact/hooks'
import { cats, error, loading } from '@/shared/signals'
import { Category } from '@/components/Products/Category'
import { CategoryFilter } from '@/components/Products/CategoryFilter'
import { ErrorCard } from '@/components/Products/ErrorCard'
import { LoadingCard } from '@/components/Products/LoadigCard'
import { getErrorMessage } from '@/shared/utils'
import { NotProducts } from '@/components/Products/NotProducts'

export function Products() {
  const [filterCategory, setFilterCategory] = useState('')

  if (loading.value) return <LoadingCard />
  if (error.value > 0) {
    if (error.value === 1101) return <NotProducts hasProducts={false} />
    return <ErrorCard message={getErrorMessage(error.value)} />
  }

  if (filterCategory && cats.value.filter((cat) => cat === filterCategory).length === 0) {
    return <NotProducts hasProducts={cats.value.length > 0} />
  }

  return (
    <div className="min-h-screen flex flex-col">
      <section>
        <div className="mt-4 flex justify-center">
          <CategoryFilter filterCategory={filterCategory} setFilterCategory={setFilterCategory} cats={cats.value} />
        </div>
        <div className="space-y-4 mb-4">
          {cats.value
            .filter((item) => !filterCategory || filterCategory.includes(item))
            .map((item) => (
              <Category key={item} category={item} />
            ))}
        </div>
      </section>
    </div>
  )
}
