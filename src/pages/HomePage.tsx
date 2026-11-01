import { Hero } from '@/components/landing/Hero'
import { Highlighted } from '@/components/landing/Highlighted'
import { usePageMeta } from '@/shared/meta'
import { homePage } from '@/seo/routes'

export function HomePage() {
  usePageMeta(homePage())
  return (
    <main class="min-h-dvh bg-surface">
      <Hero />
      <Highlighted />
    </main>
  )
}
