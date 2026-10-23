import { useState } from 'preact/hooks'
import type { InputHTMLAttributes } from 'preact'
import { getErrorMessage, isValidEmail } from '@/shared/utils'
import { usePageMeta } from '@/shared/meta'
import { login } from '@/shared/fetching'
import { Toaster, toast } from 'sonner'
import { useLocation } from 'wouter'
import { isAdmin, refreshRole } from '@/shared/signals'
import { Eye, EyeOff } from 'lucide-preact'
import { Button } from '@/ui/Button'

const field =
  'h-11 w-full rounded-md border border-line bg-surface px-3 text-sm text-ink placeholder:text-ink-muted ' +
  'transition-colors hover:border-ink/30 focus-visible:outline-none focus-visible:border-gold focus-visible:ring-2 focus-visible:ring-gold/35 disabled:opacity-50'

export function Login() {
  const [_, setLocation] = useLocation()
  usePageMeta({ title: 'Iniciar sesión | Frank Joyería', path: '/login', noIndex: true })
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const passwordInputProps: Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'role'> = {
    id: 'login-password',
    value: password,
    onInput: (e) => setPassword(e.currentTarget.value),
    required: true,
    class: `${field} pr-10`,
    placeholder: '••••••••',
    disabled: isLoading
  }

  const handleSubmit = async (e: Event) => {
    e.preventDefault()
    if (!isValidEmail(email)) {
      toast.error('Email no válido')
      return
    }

    setIsLoading(true)
    try {
      const { ok, error } = (await login(email, password)) as { ok: boolean; error: number }
      if (ok) {
        localStorage.setItem('logged', 'true')
        toast.success('Inicio de sesión exitoso. Redirigiendo...')
        try {
          await refreshRole()
          const redir = isAdmin.value ? '/dashboard' : '/'
          setLocation(redir)
        } catch (_err) {
          toast.error('Error verificando permisos. Redirigiendo al inicio...')
          setLocation('/')
        }
      } else {
        toast.error(getErrorMessage(error))
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main class="px-4 py-16 md:py-24">
      <Toaster richColors position="bottom-center" />
      <div class="mx-auto w-full max-w-sm rounded-lg border border-line bg-surface p-6 shadow-sm sm:p-8">
        <h1 class="text-center font-display text-2xl font-semibold tracking-[0.05em] text-ink">Iniciar Sesión</h1>

        <form onSubmit={handleSubmit} class="mt-6 flex flex-col gap-4">
          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-medium text-ink" for="login-email">Email</label>
            <input
              type="email"
              id="login-email"
              value={email}
              onInput={(e) => setEmail((e.target as HTMLInputElement).value)}
              required
              class={field}
              placeholder="tu@email.com"
              disabled={isLoading}
            />
          </div>

          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-medium text-ink" for="login-password">Contraseña</label>
            <div class="relative">
              {showPassword ? (
                <input type="text" {...passwordInputProps} />
              ) : (
                <input type="password" {...passwordInputProps} />
              )}
              <button
                type="button"
                class="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-ink-muted transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              >
                {showPassword ? <EyeOff size={16} aria-hidden="true" /> : <Eye size={16} aria-hidden="true" />}
              </button>
            </div>
          </div>

          <Button type="submit" block disabled={isLoading}>
            {isLoading ? 'Cargando...' : 'Iniciar Sesión'}
          </Button>
        </form>
      </div>
    </main>
  )
}
