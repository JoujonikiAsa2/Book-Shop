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
const order_utils_1 = require("./order.utils");
const auth_utils_1 = require("../auth/auth.utils");
const config_1 = __importDefault(require("../../config"));
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
    let order = yield order_model_1.Order.create({
        user: userInfo === null || userInfo === void 0 ? void 0 : userInfo._id,
        products: productData,
        totalPrice: totalPrice,
        phone: payload.phone,
        address: payload.address,
        city: payload.city,
    });
    //payment intregation
    const shurjopayPayload = {
        amount: totalPrice,
        order_id: order === null || order === void 0 ? void 0 : order._id,
        currency: 'BDT',
        customer_name: userInfo === null || userInfo === void 0 ? void 0 : userInfo.name,
        customer_phone: payload.phone,
        customer_email: user === null || user === void 0 ? void 0 : user.email,
        customer_address: payload.address,
        customer_city: payload.city,
        client_ip: client_ip,
    };
    const payment = yield order_utils_1.orderUtils.makePayment(shurjopayPayload);
    if (payment === null || payment === void 0 ? void 0 : payment.transactionStatus) {
        order = yield order.updateOne({
            transaction: {
                id: payment.sp_order_id,
                transactionStatus: payment.transactionStatus,
            },
        });
    }
    return payment.checkout_url;
});
const verifyPayment = (order_id) => __awaiter(void 0, void 0, void 0, function* () {
    const verifiedPayment = yield order_utils_1.orderUtils.verifyPaymentAsync(order_id);
    if (verifiedPayment) {
        yield order_model_1.Order.findOneAndUpdate({ 'transaction.id': order_id }, {
            'transaction.bank_status': verifiedPayment[0].bank_status,
            'transaction.sp_code': verifiedPayment[0].sp_code,
            'transaction.sp_message': verifiedPayment[0].sp_message,
            'transaction.transactionStatus': verifiedPayment[0].transaction_status,
            'transaction.method': verifiedPayment[0].method,
            'transaction.date_time': verifiedPayment[0].date_time,
            status: verifiedPayment[0].bank_status == 'Success'
                ? 'Paid'
                : verifiedPayment[0].bank_status == 'Failed'
                    ? 'Pending'
                    : verifiedPayment[0].bank_status == 'Cancel'
                        ? 'Cancelled'
                        : '',
        });
    }
    return verifiedPayment;
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
const getOrdersByUserIdFromDB = (userId, token) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, auth_utils_1.verifyToken)(token, config_1.default.jwt.access_secret);
    if (userId === user.user) {
        const result = yield order_model_1.Order.find({ user: userId });
        return result;
    }
    else {
        throw new AppError_1.default('Unauthorized Access', http_status_1.default.UNAUTHORIZED);
    }
});
const getOrderByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = order_model_1.Order.findById(id);
    return result;
});
exports.OrderService = {
    createOrderIntoDB,
    verifyPayment,
    getAllOrderFromDB,
    getOrderByIdFromDB,
    getOrdersByUserIdFromDB,
};
