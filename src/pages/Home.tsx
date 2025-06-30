import { Hero } from '../components/Landing/Hero'
import { Hightlighted } from '../components/Landing/Hightlighted'
import { Header } from '../components/Header'

export function Home() {
  return (
    <>
      <Header title="Frank Joyería" />
      <Hero />
      <Hightlighted />
    </>
  )
}
