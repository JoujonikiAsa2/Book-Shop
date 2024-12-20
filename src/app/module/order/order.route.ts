import express from 'express'
import { orderController } from './order.controller'
const router = express.Router()

//routes for orders
router.get("/", orderController.createOrder)
router.get("/revenue", orderController.getRevenue)


export const orderRoute =  router