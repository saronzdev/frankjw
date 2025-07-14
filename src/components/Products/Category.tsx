import { ProductCard } from './ProductCard'
import { capitalize } from '@/shared/utils'
import { products } from '@/shared/signals'

export function Category({ category }: { category: string }) {
  const matchProducts = products.value.filter((p) => p.category.toLowerCase().trim() === category.toLowerCase().trim())
  return (
    <section>
      <div className="w-screen py-8 mb-4 bg-gray-50">
        <h1 className="text-3xl text-center font-light">{capitalize(category)}</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-6 px-4 sm:px-6 lg:px-8">
        {matchProducts.map((p) => (
          <ProductCard key={p.id} data={p} />
        ))}
      </div>
    </section>
  )
}
