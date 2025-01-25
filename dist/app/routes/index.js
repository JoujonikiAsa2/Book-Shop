"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_route_1 = require("../module/order/order.route");
const book_route_1 = require("../module/book/book.route");
const user_route_1 = require("../module/user/user.route");
const express_1 = require("express");
const router = (0, express_1.Router)();
const moduleRoutes = [
    { path: '/users', route: user_route_1.userRoute },
    { path: '/products', route: book_route_1.bookRoute },
    { path: '/orders', route: order_route_1.orderRoute },
];
moduleRoutes.forEach(({ path, route }) => router.use(path, route));
exports.default = router;
