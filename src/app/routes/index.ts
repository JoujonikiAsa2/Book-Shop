
import { Router } from 'express';
import { authRoutes } from '../module/auth/auth.route';
import { userRoutes } from '../module/user/user.route';
import { bookRoutes } from '../module/book/book.route';
import { orderRoutes } from '../module/order/order.route';

const router = Router();


const moduleRoutes = [
  { path: '/auth', route: authRoutes },
  { path: '/users', route: userRoutes },
  { path: '/products', route: bookRoutes },
  { path: '/orders', route: orderRoutes },
]

moduleRoutes.forEach(({path, route})=>
    router.use(path, route)
)

export default router