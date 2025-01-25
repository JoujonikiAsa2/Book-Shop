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
exports.userControllers = void 0;
const apiResponseHandler_1 = require("../../utils/apiResponseHandler");
const asyncHandler_1 = require("../../utils/asyncHandler");
const user_service_1 = require("./user.service");
const createUser = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    const result = yield user_service_1.userServices.createUser(user);
    (0, apiResponseHandler_1.apiResponseHandler)(res, {
        statusCode: 200,
        success: true,
        message: 'User created successfully!',
        data: result,
    });
}));
const makeAdmin = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = user_service_1.userServices.makeAdmin(req.params.id);
    (0, apiResponseHandler_1.apiResponseHandler)(res, {
        statusCode: 200,
        success: true,
        message: 'User role updated successfully!',
        data: result
    });
}));
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
exports.userControllers = {
    createUser,
    getAllUser,
    makeAdmin
};
