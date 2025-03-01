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
/* eslint-disable @typescript-eslint/no-unused-vars */
const AppError_1 = __importDefault(require("../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const asyncHandler_1 = require("../utils/asyncHandler");
const auth_utils_1 = require("../module/auth/auth.utils");
const config_1 = __importDefault(require("../config"));
const user_model_1 = require("../module/user/user.model");
const auth = (...requiredRoles) => {
    return (0, asyncHandler_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        // check if the token send from client side
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token) {
            throw new AppError_1.default('You are not Authorized', http_status_1.default.UNAUTHORIZED);
        }
        let decoded;
        try {
            // verify token
            decoded = yield (0, auth_utils_1.verifyToken)(token, config_1.default.jwt.access_secret);
        }
        catch (err) {
            throw new AppError_1.default('Unauthorized', http_status_1.default.UNAUTHORIZED);
        }
        const { user, email, role, iat } = decoded;
        // checking if the user is exist
        const userInfo = yield user_model_1.User.findOne({ email });
        if (!userInfo) {
            throw new AppError_1.default("This user is not found !", http_status_1.default.NOT_FOUND);
        }
        if (requiredRoles && requiredRoles.includes(role)) {
            req.user = decoded;
        }
        else {
            throw new AppError_1.default('You are not Authorized', http_status_1.default.UNAUTHORIZED);
        }
        next();
    }));
};
exports.default = auth;
