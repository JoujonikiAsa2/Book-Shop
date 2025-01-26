"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const book_controller_1 = require("./book.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constant_1 = require("../user/user.constant");
const router = express_1.default.Router();
//routes for book
router.post("/", (0, auth_1.default)(user_constant_1.USER_ROLE.admin), book_controller_1.BookController.createBook);
router.get("/", (0, auth_1.default)(user_constant_1.USER_ROLE.user), (0, auth_1.default)(user_constant_1.USER_ROLE.admin), book_controller_1.BookController.getAllBooks);
router.get("/:productId", (0, auth_1.default)(user_constant_1.USER_ROLE.user), (0, auth_1.default)(user_constant_1.USER_ROLE.admin), book_controller_1.BookController.getBookById);
router.put("/:productId", (0, auth_1.default)(user_constant_1.USER_ROLE.admin), book_controller_1.BookController.updateBook);
router.delete("/:productId", (0, auth_1.default)(user_constant_1.USER_ROLE.admin), book_controller_1.BookController.deleteBook);
exports.bookRoutes = router;
