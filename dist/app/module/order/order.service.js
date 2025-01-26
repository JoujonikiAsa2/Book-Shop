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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const queryBuilder_1 = __importDefault(require("../../builder/queryBuilder"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
// import { Product } from '../book/book.model'
const user_model_1 = require("../user/user.model");
const order_constant_1 = require("./order.constant");
const order_model_1 = require("./order.model");
const http_status_1 = __importDefault(require("http-status"));
const book_model_1 = require("../book/book.model");
const createOrderIntoDB = (user, payload, client_ip) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userInfo = yield user_model_1.User.findOne({ email: user.email });
    if (!userInfo) {
        throw new AppError_1.default('User not found', http_status_1.default.NOT_FOUND);
    }
    if (!((_a = payload === null || payload === void 0 ? void 0 : payload.products) === null || _a === void 0 ? void 0 : _a.length)) {
        throw new AppError_1.default('Order is not specified', http_status_1.default.NOT_ACCEPTABLE);
    }
    const products = payload.products;
    let totalPrice = 0;
    const productData = yield Promise.all(products.map((item) => __awaiter(void 0, void 0, void 0, function* () {
        const product = yield book_model_1.Product.findById(item.product);
        if (product) {
            const subtotal = product ? (product.price || 0) * item.quantity : 0;
            totalPrice += subtotal;
            return item;
        }
    })));
    const result = yield order_model_1.Order.create({
        user: userInfo === null || userInfo === void 0 ? void 0 : userInfo._id,
        products: productData,
        totalPrice: totalPrice,
        phone: payload.phone,
        address: payload.address,
        city: payload.city,
    });
    return result;
});
const getAllOrderFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const orderQuery = new queryBuilder_1.default(order_model_1.Order.find(), query)
        .search(order_constant_1.orderSearchFields)
        .filter()
        .sort()
        .paginate();
    const result = yield orderQuery.modelQuery;
    const meta = yield orderQuery.count();
    return {
        result,
        meta,
    };
});
const getOrderByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = order_model_1.Order.findById(id);
    return result;
});
const getRevenueFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.Order.aggregate([
        {
            $lookup: {
                from: 'products',
                localField: 'product',
                foreignField: '_id',
                as: 'productDetails',
            },
        },
        {
            $unwind: '$productDetails',
        },
        {
            $addFields: {
                revenue: { $multiply: ['$quantity', '$productDetails.price'] },
            },
        },
        {
            $group: {
                _id: null,
                totalRevenue: { $sum: '$revenue' },
            },
        },
    ]);
    return result.length > 0 ? result[0].totalRevenue : 0;
});
exports.OrderService = {
    getRevenueFromDB,
    createOrderIntoDB,
    getAllOrderFromDB,
    getOrderByIdFromDB,
};
