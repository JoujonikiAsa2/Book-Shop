import express from 'express'
import { orderController } from './order.controller'
import auth from '../../middlewares/auth'
import { USER_ROLE } from '../user/user.constant'
const router = express.Router()

//routes for orders
router.post("/", auth(USER_ROLE.user,USER_ROLE.admin), orderController.createOrder)
router.get("/",auth(USER_ROLE.admin), orderController.getAllOrders)
router.get("/user-order/:userId",auth(USER_ROLE.user, USER_ROLE.admin), orderController.getOrdersByUserId)
router.get("/user/payment/verify",auth(USER_ROLE.user, USER_ROLE.admin), orderController.verifyPayment);
router.get("/:id", auth(USER_ROLE.user,USER_ROLE.admin), orderController.getOrderById)
router.delete("/:id", auth(USER_ROLE.admin), orderController.deleteOrderById)
router.patch("/:id", auth(USER_ROLE.admin), orderController.updateOrderById)

export const orderRoutes =  router