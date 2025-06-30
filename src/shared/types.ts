export const Errors = {
  // Auth Errors
  1002: 'Credenciales inválidas',
  1003: 'Acceso denegado',
  1004: 'Usuario no encontrado',
  1005: 'Contraseña incorrecta',
  1006: 'Error de autenticación',

  // Validations Errors
  2001: 'Email inválido',
  2002: 'Campo requerido',
  2003: 'Ya existe',
  2004: 'Id inválido',

  // Server Errors
  3001: 'Error de base de datos',
  3002: 'Error al subir archivos'
}

export type Errors = keyof typeof Errors

export type ProductIn = {
  productId: string
  name: string
  description: string
  category: string
  price: number
  weight: number
  karats: number
  pictures?: string[]
}

type Product = {
  id: number
  createdAt: string
}

export type ProductType = Product & ProductIn

export interface ErrorResponse {
  code: Errors
}

export interface LoginResponse {
  token: string
  role: string
  code?: number
}
