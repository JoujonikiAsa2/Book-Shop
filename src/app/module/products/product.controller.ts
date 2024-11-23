import { Request, Response } from 'express'
import { ProductService } from './product.service'
import productSchema from './product.validation'
import { TProduct } from './product.interface'

//controller for creating a book
const createProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body
    const zodProductData = await productSchema.parse(product)
    const timestamp = new Date()
    const ProductData: TProduct = {
      ...zodProductData,
      createdAt: timestamp,
      updatedAt: timestamp,
    }
    const result = await ProductService.createProductIntoDB(ProductData)
    res.status(200).json({
      status: true,
      message: 'Book created successfully',
      data: result,
    })
  } catch (err: unknown) {
    res.send(err)
  }
}

//controller for getting all books
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const result = await ProductService.getAllProductsFromDB()
    res.status(200).json({
      message: 'Books retrieved successfully',
      status: true,
      data: result,
    })
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

export const productController = {
  createProduct,
  getAllProducts,
  getProductById
}
