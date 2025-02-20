import AppError from '../../errors/AppError'
import { apiResponseHandler } from '../../utils/apiResponseHandler'
import { asyncHandler } from '../../utils/asyncHandler'
import { userServices } from './user.service'
import httpStatus from 'http-status'


const getAllUser = asyncHandler(async (req, res) => {
  const query = req.query
  const result = await userServices.getAllUsers(query)
  apiResponseHandler(res, {
    statusCode: 200,
    success: true,
    message: 'User retrieved successfully!',
    data: result.result,
    meta: result.meta,
  })
})


const getMe = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new AppError('Token not found', httpStatus.NOT_FOUND);
  }

  const { email, role } = user;
  const result = await userServices.getMe(email, role);
  apiResponseHandler(res, {
    statusCode: 200,
    success: true,
    message: 'User retrieved successfully',
    data: result,
  });
});

const updateUserData = asyncHandler(async (req, res) => {
  const result = await userServices.updateUserData(req.params.id, req.body)
  apiResponseHandler(res, {
    statusCode: 200,
    success: true,
    message: 'Updated successfully!',
    data: result,
  })
})

const deleteSignleUser = asyncHandler(async (req, res) => {
  const result = await userServices.deleteSingleUser(req.params.id)
  apiResponseHandler(res, {
    statusCode: 200,
    success: true,
    message: 'deleted successfully!',
    data: result,
  })
})

export const userControllers = {
  getAllUser,
  getMe,
  updateUserData,
  deleteSignleUser

}
