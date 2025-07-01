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

export interface LoginResponse {
  data: {
    token: string
    role: string
    code?: number
  }
  status: number
}
