import { model, Schema } from 'mongoose'
import { TBook } from './book.interface'

//Creates a book schema
const productSchema = new Schema<TBook>(
  {
    name: {
      type: String,
    },
    imgUrl:{
      type:String,
    },
    author: {
      type: String,
    },
    price: {
      type: Number,
      min: [0, "Price must be a positive number"],
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
    availability: {
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



export const Product = model<TBook>('Products', productSchema)
