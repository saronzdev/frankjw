import { lazy, Suspense } from 'preact/compat'
import { Route, Switch } from 'wouter'
import { Header } from './components/Header'
import { ProtectedRoute } from './components/ProtectedRoute'
import { LoadingCard } from './components/products/LoadingCard'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { Analytics } from '@vercel/analytics/react'

const HomePage = lazy(() => import('./pages/HomePage').then((m) => ({ default: m.HomePage })))
const Products = lazy(() => import('./pages/Products').then((m) => ({ default: m.Products })))
const Dashboard = lazy(() => import('./pages/Dashboard').then((m) => ({ default: m.Dashboard })))
const About = lazy(() => import('./pages/About').then((m) => ({ default: m.About })))
const Contact = lazy(() => import('./pages/Contact').then((m) => ({ default: m.Contact })))
const Login = lazy(() => import('./pages/Login').then((m) => ({ default: m.Login })))
const NotFound = lazy(() => import('./pages/NotFound').then((m) => ({ default: m.NotFound })))

export function App() {
  return (
    <>
      <SpeedInsights />
      <Analytics />
      <Header />
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
    </>
  )
}
