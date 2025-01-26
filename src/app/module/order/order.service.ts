/* eslint-disable @typescript-eslint/no-unused-vars */
import { JwtPayload } from 'jsonwebtoken'
import QueryBuilder from '../../builder/queryBuilder'
import AppError from '../../errors/AppError'
// import { Product } from '../book/book.model'
import { User } from '../user/user.model'
import { orderSearchFields } from './order.constant'
import { TOrder } from './order.interface'
import { Order } from './order.model'
import httpStatus from 'http-status'
import { Product } from '../book/book.model'

const createOrderIntoDB = async (
  user: JwtPayload,
  payload: Partial<TOrder>,
  client_ip: string,
) => {
  const userInfo = await User.findOne({ email: user.email })
  if (!userInfo) {
    throw new AppError('User not found', httpStatus.NOT_FOUND)
  }
  if (!payload?.products?.length) {
    throw new AppError('Order is not specified', httpStatus.NOT_ACCEPTABLE)
  }

  const products = payload.products
  let totalPrice = 0

  const productData = await Promise.all(
    products.map(async item => {
      const product = await Product.findById(item.product)
      if (product) {
        const subtotal = product ? (product.price || 0) * item.quantity : 0
        totalPrice += subtotal
        return item
      }
    }),
  )

  const result = await Order.create({
    user: userInfo?._id,
    products: productData,
    totalPrice: totalPrice,
    phone: payload.phone,
    address: payload.address,
    city: payload.city,
  })

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
