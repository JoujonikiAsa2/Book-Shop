import { OrderService } from "./order.service"
import { asyncHandler } from "../../utils/asyncHandler"
import { apiResponseHandler } from "../../utils/apiResponseHandler"

const createOrder = asyncHandler(async (req,res) => {
    const order = req.body
    const result = await OrderService.createOrderIntoDB(order)
   apiResponseHandler(res, {
       statusCode: 200,
       success:true,
       message: 'Order created successfully!',
       data:result
     })
})

const getRevenue = asyncHandler(async (req,res) => {
    const result = await OrderService.getRevenueFromDB()
    apiResponseHandler(res, {
        statusCode: 200,
        success:true,
        message: 'Get revenue successfully!',
        data:result
    })
})

export const orderController = {
    getRevenue,
    createOrder
}