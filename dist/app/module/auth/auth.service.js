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
exports.authServices = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("../user/user.model");
const http_status_1 = __importDefault(require("http-status"));
const auth_utils_1 = require("./auth.utils");
const config_1 = __importDefault(require("../../config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const sendEmail_1 = require("../../utils/sendEmail");
const registerUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield user_model_1.User.isUserExists(payload.email);
    if (isUserExist) {
        throw new AppError_1.default('Email already exist', http_status_1.default.NOT_ACCEPTABLE);
    }
    const result = yield user_model_1.User.create(payload);
    return result;
});
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const user = yield (0, auth_utils_1.validateUser)(email);
    const passwordMatch = yield user_model_1.User.isPasswordMatch(password, user === null || user === void 0 ? void 0 : user.password);
    if (!passwordMatch) {
        throw new AppError_1.default('Invalid username or password', http_status_1.default.NOT_FOUND);
    }
    const jwtPayload = {
        email: user.email,
        role: user === null || user === void 0 ? void 0 : user.role,
    };
    const accessToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt.access_secret, config_1.default.jwt.access_expires_in);
    const refreshToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
    return {
        accessToken,
        refreshToken,
    };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    // checking if the given token is valid
    const decoded = (0, auth_utils_1.verifyToken)(token, config_1.default.jwt.refresh_secret);
    const { email } = decoded;
    const user = yield (0, auth_utils_1.validateUser)(email);
    const jwtPayload = {
        email: user.email,
        role: user.role,
    };
    const accessToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt.access_secret, config_1.default.jwt.access_expires_in);
    return {
        accessToken,
    };
});
const changePassword = (userInfo, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = userInfo;
    const { password } = yield (0, auth_utils_1.validateUser)(email);
    const passwordMatch = yield user_model_1.User.isPasswordMatch(payload.currentPassword, password);
    if (!passwordMatch) {
        throw new AppError_1.default('Current password is incorrect', http_status_1.default.NOT_FOUND);
    }
    const newPassword = yield bcrypt_1.default.hash(payload.newPassword, Number(config_1.default.bcrypt_salt_rounds));
    yield user_model_1.User.findOneAndUpdate({ email, role: userInfo.role }, { password: newPassword }, { new: true });
    return null;
});
const forgetPassword = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, auth_utils_1.validateUser)(email);
    const jwtPayload = {
        email: user.email,
        role: user.role,
    };
    const resetToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt.access_secret, '10m');
    const resetURLlink = `${config_1.default.resetpass_ui_link}?id=${user.id}&token=${resetToken}`;
    (0, sendEmail_1.sendEmail)(user === null || user === void 0 ? void 0 : user.email, resetURLlink);
});
const resetPassword = (payload, token) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = payload;
    yield (0, auth_utils_1.validateUser)(email);
    const decoded = (0, auth_utils_1.verifyToken)(token, config_1.default.jwt.access_secret);
    if (payload.email !== (decoded === null || decoded === void 0 ? void 0 : decoded.email)) {
        throw new AppError_1.default('Forbidden access', http_status_1.default.FORBIDDEN);
    }
    const newPassword = yield bcrypt_1.default.hash(payload.newPassword, Number(config_1.default.bcrypt_salt_rounds));
    yield user_model_1.User.findOneAndUpdate({ email, role: decoded === null || decoded === void 0 ? void 0 : decoded.role }, { password: newPassword }, { new: true });
    return null;
});
exports.authServices = {
    registerUser,
    loginUser,
    refreshToken,
    changePassword,
    forgetPassword,
    resetPassword
};
