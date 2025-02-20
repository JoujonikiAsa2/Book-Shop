import QueryBuilder from '../../builder/queryBuilder'
import { User } from './user.model'


const getAllUsers = async (query: Record<string, unknown>) => {
  const userQuery = new QueryBuilder(User.find({}), query).search(['name'])
  const result = await userQuery.modelQuery
  return result
}

const getMe = async (email: string, role: string) => {
  let result = null;
  if (role === 'user') {
    result = await User.findOne({ email: email });
  }
  if (role === 'admin') {
    result = await User.findOne({ email: email });
  }

  return result;
};

const updateUserData = async (id: string, payload: Record<string, unknown>) => {
  const result = await User.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
  return result
}

const deleteSingleUser = async (id: string) => {
  const result = await User.findByIdAndDelete( id )
  return result
}

export const userServices = {
  getAllUsers,
  getMe,
  updateUserData,
  deleteSingleUser
}
