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
exports.orderController = void 0;
const order_service_1 = require("./order.service");
const asyncHandler_1 = require("../../utils/asyncHandler");
const apiResponseHandler_1 = require("../../utils/apiResponseHandler");
const http_status_1 = __importDefault(require("http-status"));
const createOrder = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req === null || req === void 0 ? void 0 : req.user;
    const result = yield order_service_1.OrderService.createOrderIntoDB(user, req.body, req.ip);
    (0, apiResponseHandler_1.apiResponseHandler)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: 'Order created successfully!',
        data: result,
    });
}));
const verifyPayment = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const verifiedPayment = yield order_service_1.OrderService.verifyPayment(req.query.order_id);
    (0, apiResponseHandler_1.apiResponseHandler)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: 'Order verified successfully',
        data: verifiedPayment,
    });
}));
const getAllOrders = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const result = yield order_service_1.OrderService.getAllOrderFromDB(query);
    (0, apiResponseHandler_1.apiResponseHandler)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Orders retrieved successfully!',
        data: result.result,
        meta: result.meta,
    });
}));
const getOrdersByUserId = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    const result = yield order_service_1.OrderService.getOrdersByUserIdFromDB(req.params.userId, token);
    (0, apiResponseHandler_1.apiResponseHandler)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User orders retrieved successfully!',
        data: result,
    });
}));
const getOrderById = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield order_service_1.OrderService.getOrderByIdFromDB(id);
    (0, apiResponseHandler_1.apiResponseHandler)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Order retrieved successfully!',
        data: result,
    });
}));
const deleteOrderById = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield order_service_1.OrderService.deleteOrderFromDb(id);
    (0, apiResponseHandler_1.apiResponseHandler)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: result !== null ? 'Order deleted successfully!' : 'Order already deleted!',
    });
}));
const updateOrderById = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield order_service_1.OrderService.UpdatedOrderIntoDb(id, req.body);
    (0, apiResponseHandler_1.apiResponseHandler)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Order updated successfully!',
        data: result
    });
}));
exports.orderController = {
    createOrder,
    verifyPayment,
    getAllOrders,
    getOrderById,
    getOrdersByUserId,
    deleteOrderById,
    updateOrderById
};
