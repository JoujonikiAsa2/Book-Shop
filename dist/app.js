"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const book_route_1 = require("./app/module/products/book.route");
const order_route_1 = require("./app/module/order/order.route");
const error_middleware_1 = __importDefault(require("./app/config/error.middleware"));
const app = (0, express_1.default)();
//middlewares
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/api/products', book_route_1.bookRoute);
app.use('/api/orders', order_route_1.orderRoute);
//home route for the application
app.get('/', (req, res) => {
    res.status(200).json({
        status: true,
        message: 'The application is running successfully 🚀'
    });
});
app.use(error_middleware_1.default);
exports.default = app;
