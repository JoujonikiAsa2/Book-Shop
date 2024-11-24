import express from "express";
import { BookController } from "./book.controller";
const router = express.Router();

//routes for book
router.post("/",BookController.createBook)
router.get("/",BookController.getAllBooks)
router.get("/:productId",BookController.getBookById)
router.put("/:productId",BookController.updateBook)
router.delete("/:productId",BookController.deleteBook)

export const bookRoute = router