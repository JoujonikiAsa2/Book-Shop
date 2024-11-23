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

export const productController = {
  createProduct,
}
