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

//Retrieves all books from the database by category
const getAllProductsByCategory = async (searchTerm: string) =>{
  const result = await Product.find({category: {$regex: searchTerm, $options: 'i'}})
  return result
}


//Retrieves a single book from the database.
const getSignleProductFromDB = async (productId: string) => {
  const result = await Product.findById(productId)
  return result
}


//Updates a book into the database
const updateProductIntoDB = async(productId: string, product: TProduct) => {
  const result = await Product.findByIdAndUpdate({_id: productId}, product, {new: true})
  return result
}

//Delete a book from the database
const deleteProductFromDB = async (productId:string) => {
  const result =  await Product.deleteOne({_id:productId})
  return result
}

export const ProductService = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSignleProductFromDB,
  updateProductIntoDB,
  deleteProductFromDB,
  getAllProductsByCategory
}
