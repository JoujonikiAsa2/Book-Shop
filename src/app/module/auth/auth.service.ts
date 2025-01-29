import AppError from '../../errors/AppError'
import { User } from '../user/user.model'
import { TLoginUser } from './auth.interface'
import httpStatus from 'http-status'
import { createToken, validateUser, verifyToken } from './auth.utils'
import config from '../../config'
import { TUser } from '../user/user.interface'
import { JwtPayload } from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { sendEmail } from '../../utils/sendEmail'

const registerUser = async (payload: TUser) => {
  const isUserExist = await User.isUserExists(payload.email)
  if (isUserExist) {
    throw new AppError('Email already exist', httpStatus.NOT_ACCEPTABLE)
  }
  const result = await User.create(payload)
  return result
}

const loginUser = async (payload: TLoginUser) => {
  const { email, password } = payload

  const user = await validateUser(email)

  const passwordMatch = await User.isPasswordMatch(password, user?.password)
  if (!passwordMatch) {
    throw new AppError('Invalid username or password', httpStatus.NOT_FOUND)
  }

  const jwtPayload = {
    user: user?._id.toString(),
    email: user?.email,
    role: user?.role,
  }

  const accessToken = createToken(
    jwtPayload,
    config.jwt.access_secret as string,
    config.jwt.access_expires_in as string,
  )

  const refreshToken = createToken(
    jwtPayload,
    config.jwt.refresh_secret as string,
    config.jwt.refresh_expires_in as string,
  )

  return {
    accessToken,
    refreshToken,
  }
}

const refreshToken = async (token: string) => {
  // checking if the given token is valid
  const decoded = verifyToken(token, config.jwt.refresh_secret as string)
  const { email } = decoded

  const user = await validateUser(email)

  const jwtPayload = {
    user: user?._id.toString(),
    email: user?.email,
    role: user?.role,
  }

  const accessToken = createToken(
    jwtPayload,
    config.jwt.access_secret as string,
    config.jwt.access_expires_in as string,
  )

  return {
    accessToken,
  }
}

const changePassword = async (
  userInfo: JwtPayload,
  payload: { currentPassword: string; newPassword: string },
) => {
  const { email } = userInfo

  const { password } = await validateUser(email)

  const passwordMatch = await User.isPasswordMatch(
    payload.currentPassword,
    password,
  )
  if (!passwordMatch) {
    throw new AppError('Current password is incorrect', httpStatus.NOT_FOUND)
  }

  const newPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  )

  await User.findOneAndUpdate(
    { email, role: userInfo.role },
    { password: newPassword },
    { new: true },
  )

  return null
}

const forgetPassword = async (email: string) => {
  const user = await validateUser(email)

  const jwtPayload = {
    user: user?._id.toString(),
    email: user?.email,
    role: user?.role,
  }
  const resetToken = createToken(
    jwtPayload,
    config.jwt.access_secret as string,
    '10m',
  )

  const resetURLlink = `${config.resetpass_ui_link}?id=${user.id}&token=${resetToken}`

  sendEmail(user?.email, resetURLlink)
}

const resetPassword = async (
  payload: { email:string, newPassword: string },
  token:string
) => {
  const { email } = payload

  await validateUser(email)

  const decoded = verifyToken(token, config.jwt.access_secret as string);

  if (payload.email !== decoded?.email) {
    throw new AppError('Forbidden access', httpStatus.FORBIDDEN);
  }

  const newPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  )

  await User.findOneAndUpdate(
    { email, role: decoded?.role },
    { password: newPassword },
    { new: true },
  )

  return null
}

export const authServices = {
  registerUser,
  loginUser,
  refreshToken,
  changePassword,
  forgetPassword,
  resetPassword
}
