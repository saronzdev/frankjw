import { useState } from 'preact/hooks'
import { isValidEmail } from '../shared/utils'
import { login } from '../shared/fetching'

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: Event) => {
    e.preventDefault()
    if (!isValidEmail(email)) {
      alert('Email inválido')
      return
    }
    const { ok, error } = await login(email, password)
    if (ok) {
      window.location.href = '/dashboard'
    } else {
      switch (error) {
        case 1002:
          alert('Credenciales no validas')
          break
        case 1004:
          alert('Usuario no encontrado')
          break
        case 1005:
          alert('Contraseña incorrecta')
          break
        default:
          alert('Ha ocurrido un error. ErrorCode: ' + error)
          break
      }
    }
  }

  return (
    <div class="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div class="bg-white p-8 rounded-lg shadow-sm max-w-md w-full">
        <h1 class="text-3xl font-bold text-center text-black mb-2">Iniciar Sesión</h1>
        <form onSubmit={handleSubmit} class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-black mb-2">Email</label>
            <input
              type="email"
              value={email}
              onInput={(e) => setEmail((e.target as HTMLInputElement).value)}
              required
              class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none"
              placeholder="example@email.com"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-black mb-2">Contraseña</label>
            <input
              type="password"
              value={password}
              onInput={(e) => setPassword((e.target as HTMLInputElement).value)}
              required
              class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none"
            />
          </div>

          <button
            type="submit"
            class="w-full bg-gray-900 text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors font-medium flex items-center justify-center"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  )
}
