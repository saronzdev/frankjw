import { Hero } from '@/components/landing/Hero'
import { Highlighted } from '@/components/landing/Highlighted'
import { usePageMeta } from '@/shared/meta'

export function HomePage() {
  usePageMeta({ title: 'Frank Joyería | Joyas de oro en Cuba', path: '/' })
  return (
    <main class="min-h-dvh bg-surface">
      <Hero />
      <Highlighted />
    </main>
  )
}
