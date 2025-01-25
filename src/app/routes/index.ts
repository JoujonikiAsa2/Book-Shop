import { orderRoute } from '../module/order/order.route'
import { bookRoute } from '../module/book/book.route'
import { userRoute } from '../module/user/user.route'
import { Router } from 'express';

const router = Router();


const moduleRoutes = [
  { path: '/users', route: userRoute },
  { path: '/products', route: bookRoute },
  { path: '/orders', route: orderRoute },
]

moduleRoutes.forEach(({path, route})=>
    router.use(path, route)
)

export default router