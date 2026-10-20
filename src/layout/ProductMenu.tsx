import { Link } from 'wouter'
import { ChevronDown } from 'lucide-preact'
import { cats } from '@/shared/signals'
import { normalize, slugify } from '@/shared/utils'

/** Hover/focus-driven dropdown listing product categories (desktop nav). */
export function ProductMenu() {
  return (
    <div class="group relative">
      <Link
        to="/products"
        class="relative rounded-md px-3 py-2 text-sm font-medium tracking-wide text-ink-soft transition-colors hover:text-ink"
        aria-haspopup="true"
      >
        Productos
        <ChevronDown size={14} class="ml-1 inline-block translate-y-px" aria-hidden="true" />
      </Link>

      {/* Invisible trigger zone that bridges hover between button and panel */}
      <div class="absolute inset-x-0 bottom-0 h-2" />

      <div
        class="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-2 opacity-0 transition-opacity duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100"
        onMouseDown={(e) => e.preventDefault()}
      >
        <div class="max-h-[min(60vh,28rem)] w-72 overflow-y-auto rounded-lg border border-line bg-surface p-1.5 shadow-lg">
          <ul class="space-y-0.5">
            {cats.value.map((category) => (
              <li key={category}>
                <Link
                  to={`/products/${slugify(category)}`}
                  class="block rounded-md px-3 py-2 text-sm text-ink-soft transition-colors hover:bg-surface-2 hover:text-ink"
                >
                  {normalize(category)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
