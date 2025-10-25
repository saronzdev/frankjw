import { isAdmin } from '@/shared/signals'
import { Redirect } from 'wouter'
import { LoadingCard } from './Products/LoadigCard'
import type { ComponentType } from 'preact'

export function ProtectedRoute({ component: Component }: { component: ComponentType }) {
  // Si aún se está verificando el rol (null), mostrar loading
  if (isAdmin.value === null) {
    return <LoadingCard />
  }

  // Si no es admin, redirigir al login
  if (isAdmin.value === false) {
    return <Redirect to="/login" />
  }

  // Si es admin, renderizar el componente
  return <Component />
}
