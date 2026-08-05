import { isAdmin } from '@/shared/signals'
import { Redirect } from 'wouter'
import { LoadingCard } from './products/LoadingCard'
import type { ComponentType } from 'preact'

export function ProtectedRoute({ component: Component }: { component: ComponentType }) {
  if (isAdmin.value === null) {
    return <LoadingCard />
  }

  if (isAdmin.value === false) {
    return <Redirect to="/login" />
  }

  return <Component />
}
