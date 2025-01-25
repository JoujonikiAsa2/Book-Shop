"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = require("../module/auth/auth.route");
const user_route_1 = require("../module/user/user.route");
const book_route_1 = require("../module/book/book.route");
const order_route_1 = require("../module/order/order.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    { path: '/auth', route: auth_route_1.authRoutes },
    { path: '/users', route: user_route_1.userRoutes },
    { path: '/products', route: book_route_1.bookRoutes },
    { path: '/orders', route: order_route_1.orderRoutes },
];
moduleRoutes.forEach(({ path, route }) => router.use(path, route));
exports.default = router;
