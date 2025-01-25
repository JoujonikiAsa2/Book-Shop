import { asyncWrapper } from '../../utils/asyncWrapper'
import { userServices } from './user.service'

const createUser = asyncWrapper(async (req, res) => {
    const user = req.body
    const result = await userServices.createUser(user)
    res.status(200).json({
      message: 'User create successfully',
      data: result,
    })
})
const getAllUser = asyncWrapper(async (req, res) => {
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
