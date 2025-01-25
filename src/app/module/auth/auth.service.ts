import AppError from '../../errors/AppError'
import { User } from '../user/user.model'
import { TLoginUser } from './auth.interface'
import httpStatus from 'http-status'
import { createToken } from './auth.utils'
import config from '../../config'

const loginUser = async (payload: TLoginUser) => {
  const { email, password } = payload

  const user = await User.isUserExists(email as string)
  if (!user) {
    throw new AppError('Invalid User', httpStatus.NOT_FOUND)
  }

  const passwordMatch = await User.isPasswordMatch(password, user?.password)
  if (!passwordMatch) {
    throw new AppError('Invalid User', httpStatus.NOT_FOUND)
  }

  const jwtPayload = {
    userEmail: user.email,
    role: user?.role
  }

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expire_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expire_in as string,
  );

  return {
    accessToken,
    refreshToken,
  };

}

export const authServices = {
  loginUser,
}
