/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable no-undef */
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const product_route_1 = require("./app/module/products/product.route");
const order_route_1 = require("./app/module/order/order.route");
const app = (0, express_1.default)();
//middlewares
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/api/products', product_route_1.productRoute);
app.use('/api/orders', order_route_1.orderRoute);
//home route for the application
app.get('/', (req, res) => {
    res.status(200).json({
        status: true,
        message: 'The application is running successfully 🚀'
    });
});
exports.default = app;
