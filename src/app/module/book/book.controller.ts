import { BookService } from './book.service'
import { asyncWrapper } from '../../utils/asyncWrapper'

//controller for creating a book
const createBook = asyncWrapper(async (req, res) => {

  const product = req.body
  const result = await BookService.createBookIntoDB(product)
  res.status(200).json({
    status: true,
    message: 'Book created successfully',
    data: result,
  })
})

//controller for getting all books
const getAllBooks = asyncWrapper(async (req, res) => {
  const query = req.query
  const result = await BookService.getAllBooksFromDB(query)
  res.status(200).json({
    message: 'Book retrieved successfully',
    status: true,
    meta: result.meta,
    data: result.result
  })
})

//controller for retrieves a single book
const getBookById = asyncWrapper(async (req, res) => {
  const bookId = req.params.productId
  const result = await BookService.getSignleBookFromDB(bookId)
  if (result) {
    res.status(200).json({
      message: 'Book retrieved successfully',
      status: true,
      data: result,
    })
  } else {
    res.status(404).json({
      message: 'No book found',
      status: false,
    })
  }
})

//controller for updating a book details
const updateBook = asyncWrapper(async (req, res) => {
  const bookId = req.params.productId
  const product = { ...req.body, updatedAt: new Date() }
  const result = await BookService.updateBookIntoDB(bookId, product)
  res.status(200).json({
    message: 'Book updated successfully',
    status: true,
    data: result,
  })
})

//controller for deleting a book
const deleteBook = asyncWrapper(async (req, res) => {
  const bookId = req.params.productId
  const result = await BookService.deleteBookFromDB(bookId)
  if (result.deletedCount === 1) {
    res.status(200).json({
      message: 'Book deleted successfully',
      status: true,
      data: {},
    })
  } else {
    res.status(404).json({
      message: 'Opps! SOomething went wrong, Please try again',
      status: false,
    })
  }
})

//exporting controllers
export const BookController = {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
}
