import { OrderService } from "./order.service"
import { asyncHandler } from "../../utils/asyncHandler"
import { apiResponseHandler } from "../../utils/apiResponseHandler"
import httpStatus  from "http-status"

const createOrder = asyncHandler(async (req,res) => {
    const user = req?.user
    const result = await OrderService.createOrderIntoDB(user, req.body, req.ip!)
   apiResponseHandler(res, {
       statusCode: httpStatus.CREATED,
       success:true,
       message: 'Order created successfully!',
       data:result
     })
})

const getAllOrders = asyncHandler(async (req,res) => {
    const query = req.query
    const result = await OrderService.getAllOrderFromDB(query)
   apiResponseHandler(res, {
       statusCode: httpStatus.OK,
       success:true,
       message: 'Orders retrieved successfully!',
       data:result.result,
       meta:result.meta
     })
})

const getOrderById = asyncHandler(async (req,res) => {
    const id = req.params.id
    const result = await OrderService.getOrderByIdFromDB(id)
   apiResponseHandler(res, {
       statusCode: httpStatus.OK,
       success:true,
       message: 'Order retrieved successfully!',
       data:result
     })
})

const getRevenue = asyncHandler(async (req,res) => {
    const result = await OrderService.getRevenueFromDB()
    apiResponseHandler(res, {
        statusCode: httpStatus.OK,
        success:true,
        message: 'Get revenue successfully!',
        data:result
    })
})

export const orderController = {
    getRevenue,
    createOrder,
    getAllOrders,
    getOrderById
}