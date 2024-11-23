import mongoose, { Schema } from 'mongoose'
import { TOrder } from './order.interface'

const ObjectId = Schema.Types.ObjectId

export const orderSchema = new Schema<TOrder>({
  email: {
    type: String,
  },
  product: {
    type: ObjectId,
    ref: 'Products',
  },
  quantity: {
    type: Number,
  },
  totalPrice: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})


export const Order = mongoose.model<TOrder>('Orders', orderSchema)
