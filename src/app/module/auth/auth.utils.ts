import jwt, { JwtPayload } from 'jsonwebtoken'
import { User } from '../user/user.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status'

export const createToken =  (
  jwtPayload: { user: string; email: string; role: string },
  secret: string,
  expiresIn: string,
) => {
  return  jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};

export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as JwtPayload
}


export const validateUser = async(email: string) => {
  const user = await User.findOne({email}).select(
    "password email role"
  )

  if (!user) {
    throw new AppError('User not found !', httpStatus.NOT_FOUND);
  }
  // checking if the user is already deleted
  const isDeactivated = user?.isDeactivate;

  if (isDeactivated) {
    throw new AppError('User is deleted !', httpStatus.BAD_REQUEST);
  }

  const isBlocked = user?.isBlocked;

  if (isBlocked) {
    throw new AppError('User is blocked !', httpStatus.BAD_REQUEST);
  }

  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError('User is blocked !', httpStatus.BAD_REQUEST);
  }

  return user

}