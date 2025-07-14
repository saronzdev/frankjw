import { Sample } from './Sample'
import sample1 from '@/assets/sample1.webp'
import sample2 from '@/assets/sample2.webp'
import sample3 from '@/assets/sample3.webp'

const highlights = [
  {
    src: sample1,
    text: 'Brilla con luz propia'
  },
  {
    src: sample2,
    text: 'Cada joya cuenta una historia'
  },
  {
    src: sample3,
    text: 'Elegancia en todo momento'
  }
]

export function Highlighted() {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <h3 className="text-3xl md:text-4xl font-light mb-12 text-center text-gray-800">Para todos los gustos</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {highlights.map((item, index) => (
            <Sample key={index} src={item.src} text={item.text} />
          ))}
        </div>
      </div>
    </section>
  )
}
