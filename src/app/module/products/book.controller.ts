import { NextFunction, Request, Response } from 'express'
import { BookService } from './book.service'

//controller for creating a book
const createBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = req.body
    const result = await BookService.createBookIntoDB(product)
    res.status(200).json({
      status: true,
      message: 'Book created successfully',
      data: result,
    })
  } catch (err: unknown) {
    next(err)
  }
}

//controller for getting all books
const getAllBooks = async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.searchTerm as string
    const result = searchTerm
      ? await BookService.getAllBooksByCategory(searchTerm)
      : await BookService.getAllBooksFromDB()
    if (result.length > 0) {
      res.status(200).json({
        message: 'Books retrieved successfully',
        status: true,
        data: result,
      })
    } else {
      res.status(404).json({
        message: 'No books found',
        status: false,
      })
    }
  } catch (err: unknown) {
    res.send(err)
  }
}

//controller for retrieves a single book
const getBookById = async (req: Request, res: Response) => {
  try {
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
  } catch (error: unknown) {
    res.status(400).json(error)
  }
}

//controller for updating a book details
const updateBook = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.productId
    const product = { ...req.body, updatedAt: new Date() }
    const result = await BookService.updateBookIntoDB(bookId, product)
    res.status(200).json({
      message: 'Book updated successfully',
      status: true,
      data: result,
    })
  } catch (error: unknown) {
    res.status(400).json(error)
  }
}

//controller for deleting a book
const deleteBook = async (req: Request, res: Response) => {
  try {
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
  } catch (error: unknown) {
    res.status(400).json(error)
  }
}

//exporting controllers
export const BookController = {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
}
