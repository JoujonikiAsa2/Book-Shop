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
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
      throw new AppError('You are not Authorized', httpStatus.UNAUTHORIZED)
    }
    let decoded
    try {
      // verify token
      decoded = await verifyToken(token, config.jwt.access_secret as string)
    } catch (err) {
      throw new AppError('Unauthorized', httpStatus.UNAUTHORIZED)
    }

    const { user, email, role, iat } = decoded

    // checking if the user is exist
    const userInfo = await User.findOne({ email });

    if (!userInfo) {
      throw new AppError("This user is not found !", httpStatus.NOT_FOUND);
    }


    if (requiredRoles && requiredRoles.includes(role)) {
      req.user = decoded as JwtPayload
    } else {
      throw new AppError('You are not Authorized', httpStatus.UNAUTHORIZED)
    }

    next()
  })
}

export default auth
