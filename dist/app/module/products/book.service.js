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
exports.BookService = void 0;
const book_model_1 = require("./book.model");
//Creates a book into the database
const createBookIntoDB = (product) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.Product.create(product);
    return result;
});
//Retrieves all books from the database
const getAllBooksFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.Product.find({});
    return result;
});
//Retrieves all books from the database by category
const getAllBooksByCategory = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.Product.find({ $or: [{ title: { $regex: searchTerm, $options: 'i' } }, { author: { $regex: searchTerm, $options: 'i' } }, { category: { $regex: searchTerm, $options: 'i' } }] });
    return result;
});
//Retrieves a single book from the database.
const getSignleBookFromDB = (bookId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.Product.findById(bookId);
    return result;
});
//Updates a book into the database
const updateBookIntoDB = (bookId, product) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.Product.findByIdAndUpdate({ _id: bookId }, product, { new: true });
    return result;
});
//Delete a book from the database
const deleteBookFromDB = (bookId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.Product.deleteOne({ _id: bookId });
    return result;
});
exports.BookService = {
    createBookIntoDB,
    getAllBooksFromDB,
    getSignleBookFromDB,
    updateBookIntoDB,
    deleteBookFromDB,
    getAllBooksByCategory
};
