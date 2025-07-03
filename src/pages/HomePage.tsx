import { Hero } from '../components/Landing/Hero'
import { Hightlighted } from '../components/Landing/Hightlighted'

export function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <main>
        <Hero />
        <Hightlighted />
      </main>
    </div>
  )
}
