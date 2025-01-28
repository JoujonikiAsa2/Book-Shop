"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./auth.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constant_1 = require("../user/user.constant");
const router = express_1.default.Router();
router.post('/register', auth_controller_1.authControllers.registerUser);
router.post('/login', auth_controller_1.authControllers.loginUser);
router.post('/refresh-token', auth_controller_1.authControllers.refreshToken);
router.post('/change-password', (0, auth_1.default)(user_constant_1.USER_ROLE.user, user_constant_1.USER_ROLE.admin), auth_controller_1.authControllers.changePassword);
router.post('/forget-password', auth_controller_1.authControllers.forgetPassword);
router.post('/reset-password', auth_controller_1.authControllers.resetPassword);
exports.authRoutes = router;
