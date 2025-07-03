import { Route, Switch } from 'wouter'
import { Home } from './pages/Home'
import { Products } from './pages/Products'
import { About } from './pages/About'
import { Contact } from './pages/Contact'
import { Dashboard } from './pages/Dashboard'
import { NotFound } from './pages/NotFound'
import { Login } from './pages/Login'
import { Header } from './components/Header'
import { isUserAdmin } from './shared/fetching'
import { useState, useEffect } from 'preact/hooks'

localStorage.clear()

export function App() {
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    isUserAdmin().then((admin) => setIsAdmin(admin))
  }, [])

  return (
    <>
      <Header isAdmin={isAdmin} />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/products" component={Products} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/login" component={Login} />
        <Route path="*" component={NotFound} />
      </Switch>
    </>
  )
}
