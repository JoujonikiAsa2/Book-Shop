"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRoutes = void 0;
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("./order.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constant_1 = require("../user/user.constant");
const router = express_1.default.Router();
//routes for orders
router.post("/", (0, auth_1.default)(user_constant_1.USER_ROLE.user), (0, auth_1.default)(user_constant_1.USER_ROLE.admin), order_controller_1.orderController.createOrder);
router.get("/", (0, auth_1.default)(user_constant_1.USER_ROLE.user), (0, auth_1.default)(user_constant_1.USER_ROLE.admin), order_controller_1.orderController.getAllOrders);
router.get("/:id", (0, auth_1.default)(user_constant_1.USER_ROLE.admin), order_controller_1.orderController.getOrderById);
router.get("/revenue", (0, auth_1.default)(user_constant_1.USER_ROLE.admin), order_controller_1.orderController.getRevenue);
exports.orderRoutes = router;
