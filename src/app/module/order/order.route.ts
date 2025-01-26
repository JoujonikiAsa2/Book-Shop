import express from 'express'
import { orderController } from './order.controller'
import auth from '../../middlewares/auth'
import { USER_ROLE } from '../user/user.constant'
const router = express.Router()

//routes for orders
router.post("/", auth(USER_ROLE.user), auth(USER_ROLE.admin), orderController.createOrder)
router.get("/",auth(USER_ROLE.user), auth(USER_ROLE.admin), orderController.getAllOrders)
router.get("/:id", auth(USER_ROLE.admin), orderController.getOrderById)
router.get("/revenue", auth(USER_ROLE.admin), orderController.getRevenue)

export const orderRoutes =  router