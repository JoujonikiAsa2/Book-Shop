import express from 'express'
import { authControllers } from './auth.controller'
import auth from '../../middlewares/auth'
import { USER_ROLE } from '../user/user.constant'
const router = express.Router()

router.post('/register', authControllers.registerUser)
router.post('/login', authControllers.loginUser)
router.post('/refresh-token', authControllers.refreshToken)
router.post(
  '/change-password',
  auth(USER_ROLE.user, USER_ROLE.admin),
  authControllers.changePassword,
)
router.post('/forget-password', authControllers.forgetPassword)
router.post('/reset-password', authControllers.resetPassword)
export const authRoutes = router
