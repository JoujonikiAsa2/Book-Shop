import { asyncHandler } from '../../utils/asyncHandler'
import { userServices } from './user.service'

const createUser = asyncHandler(async (req, res) => {
    const user = req.body
    const result = await userServices.createUser(user)
    res.status(200).json({
      message: 'User create successfully',
      data: result,
    })
})
const getAllUser = asyncHandler(async (req, res) => {
    const query = req.query
    const result = await userServices.getAllUsers(query)
    res.status(200).json({
      data: result,
    })
  })

export const userControllers = {
  createUser,
  getAllUser,
}
