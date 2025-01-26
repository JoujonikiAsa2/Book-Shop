import AppError from '../../errors/AppError'
import { User } from '../user/user.model'
import { TLoginUser } from './auth.interface'
import httpStatus from 'http-status'
import { createToken } from './auth.utils'
import config from '../../config'
import { TUser } from '../user/user.interface'

const registerUser = async (payload: TUser) => {
  const isUserExist =  await User.isUserExists(payload.email)
  if(isUserExist){
    throw new AppError('Email already exist', httpStatus.NOT_ACCEPTABLE)
  }
  const result = await User.create(payload)
  return result
}

const loginUser = async (payload: TLoginUser) => {
  const { email, password } = payload

  const user = await User.findOne({email}).select(
    "password email role"
  )
  if (!user) {
    throw new AppError('Invalid User', httpStatus.NOT_FOUND)
  }

  const passwordMatch = await User.isPasswordMatch(password, user?.password)
  if (!passwordMatch) {
    throw new AppError('Invalid User', httpStatus.NOT_FOUND)
  }

  const jwtPayload = {
    email: user.email,
    role: user?.role
  }
  
  const accessToken = createToken(
    jwtPayload,
    config.jwt.access_secret as string,
    config.jwt.access_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt.refresh_secret as string,
    config.jwt.refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
  };

}

export const authServices = {
  registerUser,
  loginUser,
}
