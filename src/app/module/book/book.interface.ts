//Interface for products
export type TBook = {
  name: string
  author: string
  imgUrl: string
  price: number
  category: 'Fiction' | 'Science' | 'SelfDevelopment' | 'Poetry' | 'Religious'
  description: string
  quantity: number
  availability: boolean
  createdAt: Date
  updatedAt: Date
}
