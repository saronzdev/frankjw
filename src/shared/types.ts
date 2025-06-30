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
  code: number
}

export interface LoginResponse {
  token: string
  role: string
  code?: number
}
