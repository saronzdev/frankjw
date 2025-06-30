import { Hero } from '../components/Landing/Hero'
import { Hightlighted } from '../components/Landing/Hightlighted'
import { Header } from '../components/Header'

export function Home() {
  return (
    <>
      <Header title="Frank Joyería" />
      <Hero />
      <Hightlighted />
      <footer class="w-full bg-white p-4 text-gray-800 text-center">
        <p class="text-lg">&copy;2025 Made by saronzdev</p>
      </footer>
    </>
  )
}
