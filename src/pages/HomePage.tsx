import { Hero } from '@/components/Landing/Hero'
import { Highlighted } from '@/components/Landing/Highlighted'

export function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <main>
        <Hero />
        <Highlighted />
      </main>
      <footer className="p-4 mt-4 bg-gray-100 text-lg text-center text-black">Made with ♥️ by saronzdev</footer>
    </div>
  )
}
