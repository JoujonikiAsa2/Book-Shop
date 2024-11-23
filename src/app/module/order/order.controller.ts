import { Request, Response } from "express"
import { OrderService } from "./order.service"

const createOrder = async (req: Request, res: Response) => {
    try {
        const order = req.body
        const result = await OrderService.createOrderIntoDB(order)
        res.status(200).json({
            message: 'Order created successfully',
            status: true,
            data: result
        })
    } catch (err: unknown) {
        res.status(400).json(err)
    }
}

const getRevenue = async (req: Request, res: Response) => {
    try {
        const result = await OrderService.getRevenueFromDB()
        res.status(200).json({
            message: 'Revenue calculated successfully',
            status: true,
            data: {
                totalRevenue: result[0].totalRevenue
            }
        })
    } catch (err: unknown) {
        res.status(400).json(err)
    }
}

export const orderController = {
    getRevenue,
    createOrder
}