import { BookService } from './book.service'
import { asyncHandler } from '../../utils/asyncHandler'
import { apiResponseHandler } from '../../utils/apiResponseHandler'
import httpStatus from 'http-status'

//controller for creating a book
const createBook = asyncHandler(async (req, res) => {

  const product = req.body
  const result = await BookService.createBookIntoDB(product)
  apiResponseHandler(res, {
    statusCode: httpStatus.CREATED,
    success:true,
    message: 'Book created successfully!',
    data:result
  })
})

//controller for getting all books
const getAllBooks = asyncHandler(async (req, res) => {
  const query = req.query
  const result = await BookService.getAllBooksFromDB(query)
  apiResponseHandler(res, {
    statusCode: httpStatus.OK,
    success:true,
    message: 'Book retrieved successfully!',
    meta:result.meta,
    data:result.result
  })
})

//controller for retrieves a single book
const getBookById = asyncHandler(async (req, res) => {
  const bookId = req.params.productId
  const result = await BookService.getSignleBookFromDB(bookId)
  apiResponseHandler(res, {
    statusCode: httpStatus.OK,
    success:true,
    message: 'Book retrieved successfully!',
    data:result
  })
})

//controller for updating a book details
const updateBook = asyncHandler(async (req, res) => {
  const bookId = req.params.productId
  const product = { ...req.body, updatedAt: new Date() }
  const result = await BookService.updateBookIntoDB(bookId, product)
  apiResponseHandler(res, {
    statusCode: httpStatus.OK,
    success:true,
    message: 'Book updated successfully!',
    data:result
  })
})

//controller for deleting a book
const deleteBook = asyncHandler(async (req, res) => {
  const bookId = req.params.productId
  const result = await BookService.deleteBookFromDB(bookId)
  apiResponseHandler(res, {
    statusCode: httpStatus.OK,
    success:true,
    message: 'Book deleted successfully!',
    data:result
  })
})

//exporting controllers
export const BookController = {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
}
