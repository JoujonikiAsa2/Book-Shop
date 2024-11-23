import { TProduct } from './product.interface'
import { Product } from './product.model'

//Creates a book into the database
const createProductIntoDB = async (product: TProduct) => {
  const result = await Product.create(product)
  return result
}

//Retrieves all books from the database
const getAllProductsFromDB = async () =>{
  const result = await Product.find({})
  return result
}


//Retrieves a single book from the database.
const getSignleProductFromDB = async (_id: string) => {
  const result = await Product.findById(_id)
  return result
}


export const ProductService = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSignleProductFromDB
}
