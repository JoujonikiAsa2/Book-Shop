/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable no-undef */
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
exports.productController = void 0;
const product_service_1 = require("./product.service");
//controller for creating a book
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = req.body;
        const result = yield product_service_1.ProductService.createProductIntoDB(product);
        res.status(200).json({
            status: true,
            message: 'Book created successfully',
            data: result,
        });
    }
    catch (err) {
        res.status(400).json(err);
    }
});
//controller for getting all books
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.query.searchTerm !== undefined) {
            const searchTerm = req.query.searchTerm;
            const result = yield product_service_1.ProductService.getAllProductsByCategory(searchTerm);
            res.status(200).json({
                message: 'Books retrieved successfully',
                status: true,
                data: result,
            });
        }
        else {
            const result = yield product_service_1.ProductService.getAllProductsFromDB();
            res.status(200).json({
                message: 'Books retrieved successfully',
                status: true,
                data: result,
            });
        }
    }
    catch (err) {
        res.send(err);
    }
});
//controller for retrieves a single book
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        const result = yield product_service_1.ProductService.getSignleProductFromDB(productId);
        res.status(200).json({
            message: 'Book retrieved successfully',
            status: true,
            data: result,
        });
    }
    catch (error) {
        res.status(400).json(error);
    }
});
//controller for updating a book details
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        const product = Object.assign(Object.assign({}, req.body), { updatedAt: new Date() });
        const result = yield product_service_1.ProductService.updateProductIntoDB(productId, product);
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
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        const result = yield product_service_1.ProductService.deleteProductFromDB(productId);
        if (result.deletedCount === 1) {
            res.status(200).json({
                message: 'Book deleted successfully',
                status: true,
                data: {},
            });
        }
        else {
            res.status(400).json({
                message: 'Book not found',
                status: false,
            });
        }
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.productController = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};
