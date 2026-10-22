import { lazy, Suspense, useEffect, useState } from 'preact/compat'
import { Route, Switch } from 'wouter'
import { Header } from './layout/Header'
import { Footer } from './layout/Footer'
import { UpdateBanner } from './layout/UpdateBanner'
import { ProtectedRoute } from './components/ProtectedRoute'
import { LoadingCard } from './components/products/LoadingCard'

const HomePage = lazy(() => import('./pages/HomePage').then((m) => ({ default: m.HomePage })))
const Products = lazy(() => import('./pages/Products').then((m) => ({ default: m.Products })))
const Dashboard = lazy(() => import('./pages/Dashboard').then((m) => ({ default: m.Dashboard })))
const About = lazy(() => import('./pages/About').then((m) => ({ default: m.About })))
const Contact = lazy(() => import('./pages/Contact').then((m) => ({ default: m.Contact })))
const Login = lazy(() => import('./pages/Login').then((m) => ({ default: m.Login })))
const NotFound = lazy(() => import('./pages/NotFound').then((m) => ({ default: m.NotFound })))

const SpeedInsights = lazy(() => import('@vercel/speed-insights/react').then((m) => ({ default: m.SpeedInsights })))
const Analytics = lazy(() => import('@vercel/analytics/react').then((m) => ({ default: m.Analytics })))

function ThirdPartyScripts() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (!import.meta.env.PROD) return
    const t = window.setTimeout(() => setEnabled(true), 3000)
    return () => window.clearTimeout(t)
  }, [])

  if (!enabled) return null

  return (
    <Suspense fallback={null}>
      <SpeedInsights />
      <Analytics />
    </Suspense>
  )
}

export function App() {
  return (
    <>
      <ThirdPartyScripts />
      <Header />
      <UpdateBanner />
      <Suspense fallback={<LoadingCard />}>
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/products/:category?" component={Products} />
          <Route path="/dashboard" component={() => <ProtectedRoute component={Dashboard} />} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/login" component={Login} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Suspense>
      <Footer />
    </>
  )
}