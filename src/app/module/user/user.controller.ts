import { apiResponseHandler } from '../../utils/apiResponseHandler'
import { asyncHandler } from '../../utils/asyncHandler'
import { userServices } from './user.service'

const createUser = asyncHandler(async (req, res) => {
  const user = req.body
  const result = await userServices.createUser(user)
  apiResponseHandler(res, {
    statusCode: 200,
    success: true,
    message: 'User created successfully!',
    data: result,
  })
})

const makeAdmin = asyncHandler(async (req, res) => {
    const result = userServices.makeAdmin(req.params.id)
    apiResponseHandler(res, {
        statusCode: 200,
        success:true,
        message: 'User role updated successfully!',
        data:result
      })
})

const getAllUser = asyncHandler(async (req, res) => {
  const query = req.query
  const result = await userServices.getAllUsers(query)
  apiResponseHandler(res, {
    statusCode: 200,
    success: true,
    message: 'User retrieved successfully!',
    data: result,
  })
})

export const userControllers = {
  createUser,
  getAllUser,
  makeAdmin
}
