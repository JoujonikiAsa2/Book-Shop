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
      min: [0, "Price must be a positive number"],
      required: [true, "Price is required"],
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
      min: [0, "Quantity must be a positive number"],
      required: [true, "Quantity is required"],
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

productSchema.pre('save', function (next) {
  this.createdAt = new Date()
  this.updatedAt = new Date()
  next()
})



export const Product = model<TProduct>('Products', productSchema)
