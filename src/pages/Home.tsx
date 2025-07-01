import { Hero } from '../components/Landing/Hero'
import { Hightlighted } from '../components/Landing/Hightlighted'

export function Home() {
  return (
    <>
      <Hero />
      <Hightlighted />
      <footer class="w-full bg-white p-4 text-gray-800 text-center">
        <p class="text-lg font-light">&copy;2025 Made by saronzdev</p>
      </footer>
    </>
  )
}
