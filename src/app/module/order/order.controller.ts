import { OrderService } from "./order.service"
import { asyncWrapper } from "../../utils/asyncWrapper"

const createOrder = asyncWrapper(async (req,res) => {
    const order = req.body
    const result = await OrderService.createOrderIntoDB(order)
    res.status(200).json({
        message: 'Order created successfully',
        status: true,
        data: result
    })
})

const getRevenue = asyncWrapper(async (req,res) => {
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