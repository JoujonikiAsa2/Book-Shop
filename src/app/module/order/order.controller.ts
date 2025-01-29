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

const verifyPayment = asyncHandler(async (req, res) => {
    const verifiedPayment = await OrderService.verifyPayment(req.query.order_id as string);
    apiResponseHandler(res, {
      statusCode: httpStatus.CREATED,
      success:true,
      message: "Order verified successfully",
      data: verifiedPayment,
    });
  });

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

const getOrdersByUserId = asyncHandler(async (req,res) => {
    const result = await OrderService.getOrdersByUserIdFromDB(req.params.userId)
   apiResponseHandler(res, {
       statusCode: httpStatus.OK,
       success:true,
       message: 'User orders retrieved successfully!',
       data:result
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

export const orderController = {
    createOrder,
    verifyPayment,
    getAllOrders,
    getOrderById,
    getOrdersByUserId
}