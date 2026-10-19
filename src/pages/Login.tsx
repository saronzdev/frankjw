import { useState } from 'preact/hooks'
import { getErrorMessage, isValidEmail } from '@/shared/utils'
import { login } from '@/shared/fetching'
import { Toaster, toast } from 'sonner'
import { useLocation } from 'wouter'
import { isAdmin, refreshRole } from '@/shared/signals'
import styles from '@/styles/Login.module.css'

export function Login() {
  const [_, setLocation] = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

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
    <div className={styles.container}>
      <Toaster richColors position="bottom-center" />
      <div className={styles.card}>
        <h1 className={styles.title}>Iniciar Sesión</h1>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Email</label>
            <input
              type="email"
              value={email}
              onInput={(e) => setEmail((e.target as HTMLInputElement).value)}
              required
              className={styles.input}
              placeholder="tu@email.com"
              disabled={isLoading}
            />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>Contraseña</label>
            <div className={styles.passwordContainer}>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onInput={(e) => setPassword((e.target as HTMLInputElement).value)}
                required
                className={styles.input}
                placeholder="••••••••"
                disabled={isLoading}
              />
              <button
                type="button"
                className={styles.toggleButton}
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button type="submit" className={styles.button} disabled={isLoading}>
            {isLoading ? 'Cargando...' : 'Iniciar Sesión'}
          </button>
        </form>
      </div>
    </div>
  )
}
