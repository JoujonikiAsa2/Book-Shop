/* eslint-disable @typescript-eslint/no-unused-vars */
import AppError from '../errors/AppError'
import httpStatus from 'http-status'
import { asyncHandler } from '../utils/asyncHandler'
import { verifyToken } from '../module/auth/auth.utils'
import config from '../config'
import { TUserRole } from '../module/user/user.constant'
import { User } from '../module/user/user.model'
import { JwtPayload } from 'jsonwebtoken'

const auth = (...requiredRoles: TUserRole[]) => {
  return asyncHandler(async (req, res, next) => {
    // check if the token send from client side
    const token = req.headers.authorization
    if (!token) {
      throw new AppError('You are not Authorized', httpStatus.UNAUTHORIZED)
    }
    let decoded
    try {
      // verify token
      decoded = await verifyToken(token, config.jwt_access_secret as string)
    } catch (err) {
      throw new AppError('Unauthorized', httpStatus.UNAUTHORIZED)
    }

    const { userId, role, iat } = decoded

    if (requiredRoles && requiredRoles.includes(role)) {
      req.user = decoded as JwtPayload
    } else {
      throw new AppError('You are not Authorized', httpStatus.UNAUTHORIZED)
    }

    next()
  })
}

export default auth
