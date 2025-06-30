import { Sample } from './Sample'
import sample1 from '@/assets/sample1.jpg'
import sample2 from '@/assets/sample2.jpg'
import sample3 from '@/assets/sample3.jpg'

export function Hightlighted() {
  return (
    <section class="bg-gray-50 py-10 sm:py-20">
      <div class="container mx-auto px-4">
        <h3 class="text-4xl font-light mb-8 sm:mb-10 text-center">Para todos los gustos</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <Sample src={sample1} text="Brilla con luz propia" />
          <Sample src={sample2} text="Cada joya cuenta una historia" />
          <Sample src={sample3} text="Elegancia en todo momento" />
        </div>
      </div>
    </section>
  )
}
