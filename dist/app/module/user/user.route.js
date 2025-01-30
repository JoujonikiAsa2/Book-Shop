"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const user_constant_1 = require("./user.constant");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = (0, express_1.Router)();
router.get('/', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), user_controller_1.userControllers.getAllUser);
router.get('/me', (0, auth_1.default)(user_constant_1.USER_ROLE.user, user_constant_1.USER_ROLE.admin), user_controller_1.userControllers.getMe);
router.patch('/update-profile/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.user, user_constant_1.USER_ROLE.admin), user_controller_1.userControllers.updateProfile);
exports.userRoutes = router;
