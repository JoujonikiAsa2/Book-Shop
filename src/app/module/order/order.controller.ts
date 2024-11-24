import { NextFunction, Request, Response } from "express"
import { OrderService } from "./order.service"

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const order = req.body
        const result = await OrderService.createOrderIntoDB(order)
        res.status(200).json({
            message: 'Order created successfully',
            status: true,
            data: result
        })
    } catch (err: unknown) {
        next(err)
    }
}

const getRevenue = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await OrderService.getRevenueFromDB()
        res.status(200).json({
            message: 'Revenue calculated successfully',
            status: true,
            data: {
                totalRevenue: result
            }
        })
    } catch (err: unknown) {
        next(err)
    }
}

export const orderController = {
    getRevenue,
    createOrder
}