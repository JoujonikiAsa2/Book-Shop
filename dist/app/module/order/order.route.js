"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRoutes = void 0;
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("./order.controller");
const router = express_1.default.Router();
//routes for orders
router.post("/", order_controller_1.orderController.createOrder);
router.get("/", order_controller_1.orderController.getAllOrders);
router.get("/:id", order_controller_1.orderController.getOrderById);
router.get("/revenue", order_controller_1.orderController.getRevenue);
exports.orderRoutes = router;
