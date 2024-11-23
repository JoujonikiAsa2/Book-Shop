import { model, Schema } from 'mongoose'
import { TProduct } from './product.interface'

const productSchema = new Schema<TProduct>(
  {
    title: {
      type: String,
    },
    author: {
      type: String,
    },
    price: {
      type: Number,
    },
    category: {
      type: String,
      enum: {
        values: [
          'Fiction',
          'Science',
          'SelfDevelopment',
          'Poetry',
          'Religious',
        ],
        message:
          'Category must be Fiction or Science or SelfDevelopment or Poetry or Religious',
      },
    },
    description: {
      type: String,
    },
    quantity: {
      type: Number,
    },
    inStock: {
      type: Boolean,
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
  }
)


export const Product = model<TProduct>('Products', productSchema)
