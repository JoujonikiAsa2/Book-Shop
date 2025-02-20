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
import { orderUtils } from './order.utils'
import { validateUser, verifyToken } from '../auth/auth.utils'
import config from '../../config'

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

  let order = await Order.create({
    user: userInfo?._id,
    products: productData,
    totalPrice: totalPrice,
    phone: payload.phone,
    address: payload.address,
    city: payload.city,
  })

  //payment intregation
  const shurjopayPayload = {
    amount: totalPrice,
    order_id: order?._id,
    currency: 'BDT',
    customer_name: userInfo?.name,
    customer_phone: payload.phone,
    customer_email: user?.email,
    customer_address: payload.address,
    customer_city: payload.city,
    client_ip: client_ip,
  }

  const payment = await orderUtils.makePayment(shurjopayPayload)

  if (payment?.transactionStatus) {
    order = await order.updateOne({
      transaction: {
        id: payment.sp_order_id,
        transactionStatus: payment.transactionStatus,
      },
    })
  }
  return payment.checkout_url
}

const verifyPayment = async (order_id: string) => {
  const verifiedPayment = await orderUtils.verifyPaymentAsync(order_id)
  if (verifiedPayment) {
    await Order.findOneAndUpdate(
      { 'transaction.id': order_id },
      {
        'transaction.bank_status': verifiedPayment[0].bank_status,
        'transaction.sp_code': verifiedPayment[0].sp_code,
        'transaction.sp_message': verifiedPayment[0].sp_message,
        'transaction.transactionStatus': verifiedPayment[0].transaction_status,
        'transaction.method': verifiedPayment[0].method,
        'transaction.date_time': verifiedPayment[0].date_time,
        status:
          verifiedPayment[0].bank_status == 'Success'
            ? 'Paid'
            : verifiedPayment[0].bank_status == 'Failed'
              ? 'Pending'
              : verifiedPayment[0].bank_status == 'Cancel'
                ? 'Cancelled'
                : '',
      },
    )
  }
  return verifiedPayment
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

const getOrdersByUserIdFromDB = async (userId: string, token: string) => {
  const user = await verifyToken(token, config.jwt.access_secret as string)
  if (userId === user.user) {
    const result = await Order.find({ user: userId })
    return result
  }
  else{
    throw new AppError('Unauthorized Access', httpStatus.UNAUTHORIZED)
  }
}

const getOrderByIdFromDB = async (id: string) => {
  const result = Order.findById(id)
  return result
}

const deleteOrderFromDb = async(id: string) =>{
  const result = await Order.findByIdAndDelete(id)
  return result
}
const UpdatedOrderIntoDb = async(id: string, payload: Record<string, unknown>) =>{
  const result = await Order.findByIdAndUpdate(id, payload, { new: true })
  return result
}

export const OrderService = {
  createOrderIntoDB,
  verifyPayment,
  getAllOrderFromDB,
  getOrderByIdFromDB,
  getOrdersByUserIdFromDB,
  deleteOrderFromDb,
  UpdatedOrderIntoDb
}
