import express from "express";
import { BookController } from "./book.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";
const router = express.Router();

//routes for book
router.post("/",BookController.createBook)
router.get("/",BookController.getAllBooks)
router.get("/:productId",BookController.getBookById)
router.put("/:productId",BookController.updateBook)
router.delete("/:productId", auth(USER_ROLE.admin), BookController.deleteBook)

export const bookRoutes = router