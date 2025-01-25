"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookController = void 0;
const book_service_1 = require("./book.service");
const asyncHandler_1 = require("../../utils/asyncHandler");
const apiResponseHandler_1 = require("../../utils/apiResponseHandler");
//controller for creating a book
const createBook = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = req.body;
    const result = yield book_service_1.BookService.createBookIntoDB(product);
    (0, apiResponseHandler_1.apiResponseHandler)(res, {
        statusCode: 200,
        success: true,
        message: 'Book created successfully!',
        data: result
    });
}));
//controller for getting all books
const getAllBooks = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const result = yield book_service_1.BookService.getAllBooksFromDB(query);
    (0, apiResponseHandler_1.apiResponseHandler)(res, {
        statusCode: 200,
        success: true,
        message: 'Book retrieved successfully!',
        meta: result.meta,
        data: result.result
    });
}));
//controller for retrieves a single book
const getBookById = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.productId;
    const result = yield book_service_1.BookService.getSignleBookFromDB(bookId);
    (0, apiResponseHandler_1.apiResponseHandler)(res, {
        statusCode: 200,
        success: true,
        message: 'Book retrieved successfully!',
        data: result
    });
}));
//controller for updating a book details
const updateBook = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.productId;
    const product = Object.assign(Object.assign({}, req.body), { updatedAt: new Date() });
    const result = yield book_service_1.BookService.updateBookIntoDB(bookId, product);
    (0, apiResponseHandler_1.apiResponseHandler)(res, {
        statusCode: 200,
        success: true,
        message: 'Book updated successfully!',
        data: result
    });
}));
//controller for deleting a book
const deleteBook = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.productId;
    const result = yield book_service_1.BookService.deleteBookFromDB(bookId);
    (0, apiResponseHandler_1.apiResponseHandler)(res, {
        statusCode: 200,
        success: true,
        message: 'Book deleted successfully!',
        data: result
    });
}));
//exporting controllers
exports.BookController = {
    createBook,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook,
};
