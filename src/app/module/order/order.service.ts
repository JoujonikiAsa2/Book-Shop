import { Product } from '../products/product.model'
import { TOrder } from './order.interface'
import { Order } from './order.model'
import { orderSchema } from './order.validation'

const createOrderIntoDB = async (order: TOrder) => {
  const product = await Product.findById(order.product)

  if (!product) {
    throw { message: 'Product not found', status: false }
  }

  if (product.quantity < order.quantity) {
    throw { message: 'Insufficient stock', status: false }
  }

  const updatedQuantity = product.quantity - order.quantity
  await Product.findByIdAndUpdate(
    { _id: order.product },
    {
      $set: {
        quantity: updatedQuantity,
        inStock: updatedQuantity > 0,
      },
    },
    { new: true }
  )

  const totalPrice = product.price * order.quantity
  order.totalPrice = totalPrice

  const zodValidator = orderSchema.parse(order)   
  const result = await Order.create(zodValidator)
  return result
}

const getRevenueFromDB = async () => {
  const result = await Order.aggregate([
    {
      $lookup: {
        from: 'products',
        localField: 'product',
        foreignField: '_id',
        as: 'productDetails',
      },
    },
    {
      $unwind: '$productDetails',
    },
    {
      $addFields: {
        revenue: { $multiply: ['$quantity', '$productDetails.price'] },
      },
    },
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$revenue' },
      },
    },
  ])

  return result.length > 0 ? result[0].totalRevenue : 0
}

export const OrderService = {
  createOrderIntoDB,
  getRevenueFromDB,
}
