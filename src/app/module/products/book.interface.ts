//Interface for products
export type TBook = {
  title: string
  author: string
  price: number
  category: 'Fiction' | 'Science' | 'SelfDevelopment' | 'Poetry' | 'Religious'
  description: string
  quantity: number
  inStock: boolean
  createdAt: Date
  updatedAt: Date
}