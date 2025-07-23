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
          refreshRole()
          const redir = isAdmin.value ? '/dashboard' : '/'
          setLocation(redir)
        } catch (err) {
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
            <input
              type="password"
              value={password}
              onInput={(e) => setPassword((e.target as HTMLInputElement).value)}
              required
              className={styles.input}
              placeholder="••••••••"
              disabled={isLoading}
            />
          </div>

          <button type="submit" className={styles.button} disabled={isLoading}>
            {isLoading ? 'Cargando...' : 'Iniciar Sesión'}
          </button>
        </form>
      </div>
    </div>
  )
}
