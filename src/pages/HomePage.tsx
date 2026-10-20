import { Hero } from '@/components/landing/Hero'
import { Highlighted } from '@/components/landing/Highlighted'

export function HomePage() {
  return (
    <main class="min-h-dvh bg-surface">
      <Hero />
      <Highlighted />
    </main>
  )
}
