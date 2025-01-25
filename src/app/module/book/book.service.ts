import QueryBuilder from '../../builder/queryBuilder'
import { TUser } from '../user/user.interface'
import { bookSearchFields } from './book.constant'
import { TBook } from './book.interface'
import { Product } from './book.model'

//Creates a book into the database
const createBookIntoDB = async (product: TBook) => {
  const result = await Product.create(product)
  return result
}

//Retrieves all books from the database
const getAllBooksFromDB = async (query: Partial<TUser>) => {
  const bookQuery = new QueryBuilder(
    Product.find(),
    query,
  )
    .search(bookSearchFields)
    .filter()
    .sort()

  const result = await bookQuery.modelQuery
  const meta = await bookQuery.count()
  return {
    result: result,
    meta: meta
  }
}

//Retrieves all books from the database by category
const getAllBooksByCategory = async (searchTerm: string) => {
  const result = await Product.find({
    $or: [
      { title: { $regex: searchTerm, $options: 'i' } },
      { author: { $regex: searchTerm, $options: 'i' } },
      { category: { $regex: searchTerm, $options: 'i' } },
    ],
  })
  return result
}

//Retrieves a single book from the database.
const getSignleBookFromDB = async (bookId: string) => {
  const result = await Product.findById(bookId)
  return result
}

//Updates a book into the database
const updateBookIntoDB = async (bookId: string, product: TBook) => {
  const result = await Product.findByIdAndUpdate({ _id: bookId }, product, {
    new: true,
  })
  return result
}

//Delete a book from the database
const deleteBookFromDB = async (bookId: string) => {
  const result = await Product.deleteOne({ _id: bookId })
  return result
}

export const BookService = {
  createBookIntoDB,
  getAllBooksFromDB,
  getSignleBookFromDB,
  updateBookIntoDB,
  deleteBookFromDB,
  getAllBooksByCategory,
}
