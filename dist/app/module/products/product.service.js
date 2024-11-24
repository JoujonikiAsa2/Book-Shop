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
exports.ProductService = void 0;
const product_model_1 = require("./product.model");
//Creates a book into the database
const createProductIntoDB = (product) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.create(product);
    return result;
});
//Retrieves all books from the database
const getAllProductsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.find({});
    return result;
});
//Retrieves all books from the database by category
const getAllProductsByCategory = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.find({ category: { $regex: searchTerm, $options: 'i' } });
    return result;
});
//Retrieves a single book from the database.
const getSignleProductFromDB = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findById(productId);
    return result;
});
//Updates a book into the database
const updateProductIntoDB = (productId, product) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findByIdAndUpdate({ _id: productId }, product, { new: true });
    return result;
});
//Delete a book from the database
const deleteProductFromDB = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.deleteOne({ _id: productId });
    return result;
});
exports.ProductService = {
    createProductIntoDB,
    getAllProductsFromDB,
    getSignleProductFromDB,
    updateProductIntoDB,
    deleteProductFromDB,
    getAllProductsByCategory
};
