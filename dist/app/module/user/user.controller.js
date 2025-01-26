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
exports.userControllers = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const apiResponseHandler_1 = require("../../utils/apiResponseHandler");
const asyncHandler_1 = require("../../utils/asyncHandler");
const user_service_1 = require("./user.service");
const http_status_1 = __importDefault(require("http-status"));
const getAllUser = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const result = yield user_service_1.userServices.getAllUsers(query);
    (0, apiResponseHandler_1.apiResponseHandler)(res, {
        statusCode: 200,
        success: true,
        message: 'User retrieved successfully!',
        data: result,
    });
}));
const getMe = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (!user) {
        throw new AppError_1.default('Token not found', http_status_1.default.NOT_FOUND);
    }
    const { email, role } = user;
    const result = yield user_service_1.userServices.getMe(email, role);
    (0, apiResponseHandler_1.apiResponseHandler)(res, {
        statusCode: 200,
        success: true,
        message: 'User retrieved successfully',
        data: result,
    });
}));
exports.userControllers = {
    getAllUser,
    getMe
};
