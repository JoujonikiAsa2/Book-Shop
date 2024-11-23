import express from 'express'
import { orderController } from './order.controller'
const router = express.Router()

router.get("/", orderController.createOrder)
router.get("/revenue", orderController.getRevenue)


export const orderRoute =  router