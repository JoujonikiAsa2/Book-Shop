import { Request, Response } from 'express'
import { ProductService } from './product.service'

//controller for creating a book
const createProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body
    const result = await ProductService.createProductIntoDB(product)
    res.status(200).json({
      status: true,
      message: 'Book created successfully',
      data: result,
    })
  } catch (err: unknown) {
    res.status(400).json(err)
  }
}

//controller for getting all books
const getAllProducts = async (req: Request, res: Response) => {
  try {
    if (req.query.searchTerm !== undefined) {
      const searchTerm = req.query.searchTerm
      console.log(searchTerm)
      const result = await ProductService.getAllProductsByCategory(
        searchTerm as string,
      )
      res.status(200).json({
        message: 'Books retrieved successfully',
        status: true,
        data: result,
      })
    } else {
      const result = await ProductService.getAllProductsFromDB()
      res.status(200).json({
        message: 'Books retrieved successfully',
        status: true,
        data: result,
      })
    }
  } catch (err: unknown) {
    res.send(err)
  }
}

//controller for retrieves a single book
const getProductById = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId
    const result = await ProductService.getSignleProductFromDB(productId)
    res.status(200).json({
      message: 'Book retrieved successfully',
      status: true,
      data: result,
    })
  } catch (error: unknown) {
    res.status(400).json(error)
  }
}

//controller for updating a book details
const updateProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId
    const product = { ...req.body, updatedAt: new Date() }
    const result = await ProductService.updateProductIntoDB(productId, product)
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
const deleteProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId
    const result = await ProductService.deleteProductFromDB(productId)
    if (result.deletedCount === 1) {
      res.status(200).json({
        message: 'Book deleted successfully',
        status: true,
        data: {},
      })
    } else {
      res.status(400).json({
        message: 'Book not found',
        status: false,
      })
    }
  } catch (error: unknown) {
    res.status(400).json(error)
  }
}

export const productController = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
}
