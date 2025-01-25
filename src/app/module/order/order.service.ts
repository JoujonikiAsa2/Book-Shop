import QueryBuilder from '../../builder/queryBuilder'
import AppError from '../../errors/AppError'
import { Product } from '../book/book.model'
import { orderSearchFields } from './order.constant'
import { TOrder } from './order.interface'
import { Order } from './order.model'
import httpStatus from 'http-status'

const createOrderIntoDB = async (order: TOrder) => {
  const product = await Product.findById(order.product)

  //throw relavant error
  if (!product) {
    throw new AppError('Product not found', httpStatus.NOT_FOUND)
  }

  if (product.quantity < order.quantity) {
    throw new AppError('Insufficient stock', httpStatus.NOT_FOUND)
  }

  //it reduce the quantity
  const updatedQuantity = product.quantity - order.quantity
  await Product.findByIdAndUpdate(
    { _id: order.product },
    {
      $set: {
        quantity: updatedQuantity,
        inStock: updatedQuantity > 0,
      },
    },
    { new: true },
  )

  const totalPrice = product.price * order.quantity
  order.totalPrice = totalPrice

  const result = await Order.create(order)
  return result
}

const getAllOrderFromDB = async (query: Record<string, unknown>) => {
  const orderQuery = new QueryBuilder(Order.find(), query)
    .search(orderSearchFields)
    .filter()
    .sort()
    .paginate()
  const result = await orderQuery.modelQuery
  const meta = await orderQuery.count()
  return {
    result,
    meta,
  }
}

const getOrderByIdFromDB = async (id: string) => {
  const result = Order.findById(id)
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
  getRevenueFromDB,
  createOrderIntoDB,
  getAllOrderFromDB,
  getOrderByIdFromDB,
}
