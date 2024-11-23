"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = __importDefault(require("zod"));
const productSchema = zod_1.default
    .object({
    title: zod_1.default.string({
        message: 'Title must be a string',
    }),
    author: zod_1.default.string({
        message: 'Auhtor must be a string',
    }),
    price: zod_1.default.number({
        message: 'Price must be a positive number',
    }),
    category: zod_1.default.enum(['Fiction', 'Science', 'SelfDevelopment', 'Poetry', 'Religious'], {
        required_error: 'Category must be Fiction or Science or SelfDevelopment or Poetry or Religious',
    }),
    description: zod_1.default.string({
        required_error: 'Description must be a string',
    }),
    quantity: zod_1.default.number({
        required_error: 'Quantity must be a positive number',
    }),
    inStock: zod_1.default.boolean({
        required_error: 'InStock must be a boolean number',
    }),
});
exports.default = productSchema;
