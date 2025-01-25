import { Router } from "express";
import { userControllers } from "./user.controller";

const router = Router()
router.post('/',userControllers.createUser)
router.patch('/make-admin/:id',userControllers.makeAdmin)
router.get('/',userControllers.getAllUser)
export const userRoute = router