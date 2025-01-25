import { OrderService } from "./order.service"
import { asyncHandler } from "../../utils/asyncHandler"

const createOrder = asyncHandler(async (req,res) => {
    const order = req.body
    const result = await OrderService.createOrderIntoDB(order)
    res.status(200).json({
        message: 'Order created successfully',
        status: true,
        data: result
    })
})

const getRevenue = asyncHandler(async (req,res) => {
    const result = await OrderService.getRevenueFromDB()
    res.status(200).json({
        message: 'Revenue calculated successfully',
        status: true,
        data: {
            totalRevenue: result
        }
    })
})

export const orderController = {
    getRevenue,
    createOrder
}