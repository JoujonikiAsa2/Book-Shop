/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-require-imports */
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.orderSchema = zod_1.default.object({
    email: zod_1.default.string().email(),
    product: zod_1.default.string(),
    quantity: zod_1.default.number().min(1, {
        message: 'Quantity must be a positive number',
    }),
    totalPrice: zod_1.default.number().min(0, {
        message: 'TotalPrice must be a positive number',
    }),
});
