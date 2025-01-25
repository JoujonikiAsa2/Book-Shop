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
exports.OrderService = void 0;
const book_model_1 = require("../book/book.model");
const order_model_1 = require("./order.model");
const createOrderIntoDB = (order) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield book_model_1.Product.findById(order.product);
    //throw relavant error
    if (!product) {
        throw { message: 'Product not found', status: false };
    }
    if (product.quantity < order.quantity) {
        throw { message: 'Insufficient stock', status: false };
    }
    //it reduce the quantity
    const updatedQuantity = product.quantity - order.quantity;
    yield book_model_1.Product.findByIdAndUpdate({ _id: order.product }, {
        $set: {
            quantity: updatedQuantity,
            inStock: updatedQuantity > 0,
        },
    }, { new: true });
    const totalPrice = product.price * order.quantity;
    order.totalPrice = totalPrice;
    const result = yield order_model_1.Order.create(order);
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
    createOrderIntoDB,
    getRevenueFromDB,
};
