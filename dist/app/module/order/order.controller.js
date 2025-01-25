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
exports.orderController = void 0;
const order_service_1 = require("./order.service");
const asyncHandler_1 = require("../../utils/asyncHandler");
const apiResponseHandler_1 = require("../../utils/apiResponseHandler");
const createOrder = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = req.body;
    const result = yield order_service_1.OrderService.createOrderIntoDB(order);
    (0, apiResponseHandler_1.apiResponseHandler)(res, {
        statusCode: 200,
        success: true,
        message: 'Order created successfully!',
        data: result
    });
}));
const getAllOrders = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const result = yield order_service_1.OrderService.getAllOrderFromDB(query);
    (0, apiResponseHandler_1.apiResponseHandler)(res, {
        statusCode: 200,
        success: true,
        message: 'Orders retrieved successfully!',
        data: result.result,
        meta: result.meta
    });
}));
const getOrderById = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield order_service_1.OrderService.getOrderByIdFromDB(id);
    (0, apiResponseHandler_1.apiResponseHandler)(res, {
        statusCode: 200,
        success: true,
        message: 'Order retrieved successfully!',
        data: result
    });
}));
const getRevenue = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_service_1.OrderService.getRevenueFromDB();
    (0, apiResponseHandler_1.apiResponseHandler)(res, {
        statusCode: 200,
        success: true,
        message: 'Get revenue successfully!',
        data: result
    });
}));
exports.orderController = {
    getRevenue,
    createOrder,
    getAllOrders,
    getOrderById
};
