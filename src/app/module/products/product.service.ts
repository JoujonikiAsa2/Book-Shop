import { TProduct } from './product.interface'
import { Product } from './product.model'

//Creates a book into the database
const createProductIntoDB = async (product: TProduct) => {
  const result = await Product.create(product)
  return result
}

const getAllProductsFromDB = async () =>{
  const result = await Product.find({})
  return result
}


export const ProductService = {
  createProductIntoDB,
  getAllProductsFromDB
}
