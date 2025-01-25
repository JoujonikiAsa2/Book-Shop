import { Request, Response } from "express"
import { userServices } from "./user.service"

const createUser = async(req:Request, res:Response)=>{
    const user = req.body
    const result = await userServices.createUser(user)
    res.status(200).json({
        message:"User create successfully",
        data: result
    })
}
const getAllUser = async(req:Request, res:Response)=>{
    const query = req.query
    const result = await userServices.getAllUsers(query)
    res.status(200).json({
        data: result
    })
}
export const userControllers = {
    createUser,
    getAllUser
}