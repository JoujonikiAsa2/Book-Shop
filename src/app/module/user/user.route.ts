import { Router } from "express";
import { userControllers } from "./user.controller";
import { USER_ROLE } from "./user.constant";
import auth from "../../middlewares/auth";

const router = Router()
router.get('/',auth(USER_ROLE.admin),userControllers.getAllUser)
router.get(
    '/me',
    auth(USER_ROLE.user, USER_ROLE.admin),
    userControllers.getMe,
  );
  router.patch('/update-profile/:id', auth(USER_ROLE.user, USER_ROLE.admin), userControllers.updateUserData)
  router.delete('/:id',auth(USER_ROLE.admin),userControllers.deleteSignleUser)
export const userRoutes = router