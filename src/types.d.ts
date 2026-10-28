export type ProductIn = {
  productId: string
  description: string
  category: string
  price: number
  weight: number
  karats: number[]
  isActive: boolean
  pictures?: string[]
  sales: number
  hasDiscount: boolean
  hasPreciousStones: boolean
  offerPrice?: number
}

type Product = {
  id: number
  createdAt: number
}

export type ProductOut = Product & Omit<ProductIn, 'karats'> & { karats: string }

export type ProductType = Product & Omit<ProductIn, 'karats'> & { karats: number[] }

type ResultError = {
  error?: number
}

export type Result = ResultError & ProductType[]

export interface LoginResponse {
  data: {
    token: string
    role: string
    code?: number
  }
  status: number
}
export interface Seller {
  name: string
  number: number
  location: string
}

export interface Category {
  title: string
  description: string
  img: string
  order: number
}
