/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-unused-expressions */
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
//controller for creating a book
const createBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = req.body;
        const result = yield book_service_1.BookService.createBookIntoDB(product);
        res.status(200).json({
            status: true,
            message: 'Book created successfully',
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
//controller for getting all books
const getAllBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchTerm = req.query.searchTerm;
        const result = searchTerm
            ? yield book_service_1.BookService.getAllBooksByCategory(searchTerm)
            : yield book_service_1.BookService.getAllBooksFromDB();
        if (result.length > 0) {
            res.status(200).json({
                message: 'Books retrieved successfully',
                status: true,
                data: result,
            });
        }
        else {
            res.status(404).json({
                message: 'No books found',
                status: false,
            });
        }
    }
    catch (err) {
        res.send(err);
    }
});
//controller for retrieves a single book
const getBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const result = yield book_service_1.BookService.getSignleBookFromDB(bookId);
        if (result) {
            res.status(200).json({
                message: 'Book retrieved successfully',
                status: true,
                data: result,
            });
        }
        else {
            res.status(404).json({
                message: 'No book found',
                status: false,
            });
        }
    }
    catch (error) {
        res.status(400).json(error);
    }
});
//controller for updating a book details
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const product = Object.assign(Object.assign({}, req.body), { updatedAt: new Date() });
        const result = yield book_service_1.BookService.updateBookIntoDB(bookId, product);
        res.status(200).json({
            message: 'Book updated successfully',
            status: true,
            data: result,
        });
    }
    catch (error) {
        res.status(400).json(error);
    }
});
//controller for deleting a book
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const result = yield book_service_1.BookService.deleteBookFromDB(bookId);
        if (result.deletedCount === 1) {
            res.status(200).json({
                message: 'Book deleted successfully',
                status: true,
                data: {},
            });
        }
        else {
            res.status(404).json({
                message: 'Opps! SOomething went wrong, Please try again',
                status: false,
            });
        }
    }
    catch (error) {
        res.status(400).json(error);
    }
});
//exporting controllers
exports.BookController = {
    createBook,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook,
};
