import { Schema, Types } from 'mongoose'

export interface TOrder {
  user: Schema.Types.ObjectId
  products: {
    product: Types.ObjectId
    quantity: number
  }[]
  totalPrice: number
  status: 'Pending' | 'Paid' | 'Cancelled'
  transaction: {
    id: string
    transactionStatus: string
    bank_status: string
    sp_code: string
    sp_message: string
    method: string
    date_time: string
  }
  phone: string
  address: string
  city: string
  createdAt: Date
  updatedAt: Date
}
