import { useState, useEffect } from 'preact/hooks'
import { getProductsByCategory } from '@/shared/fetching'
import type { ProductType } from '@/shared/types'
import { ProductCard } from './ProductCard'
import { LoadingCard } from './LoadigCard'
import { ErrorCard } from './ErrorCard'
import { NotProducts } from './NotProducts'
import { getErrorMessage } from '@/shared/utils'

export function Category({ category }: { category: string }) {
  const [products, setProducts] = useState<ProductType[]>([])
  const [error, setError] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getProductsByCategory(setProducts, setError, setLoading, category)
  }, [])

  if (loading) return <LoadingCard />
  if (error > 0) {
    if (error === 1101) return <NotProducts hasProducts={false} />
    return <ErrorCard message={getErrorMessage(error)} />
  }

  if (products.length === 0) {
    return <NotProducts hasProducts={false} />
  }

  return (
    <section>
      <div className="w-screen py-8 mb-4 bg-gray-50">
        <h1 className="text-3xl text-center font-light">{category}</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-6 px-4 sm:px-6 lg:px-8">
        {products.map((p) => (
          <ProductCard key={p.id} data={p} />
        ))}
      </div>
    </section>
  )
}
