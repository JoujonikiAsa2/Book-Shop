import mongoose, { Schema } from 'mongoose'
import { TOrder } from './order.interface'

const ObjectId = Schema.Types.ObjectId

export const orderSchema = new Schema<TOrder>({
  email: {
    type: String,
    required: true,
    validate: {
      validator: function (email: string) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
      },
      message: 'Invalid email address',
    }
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
