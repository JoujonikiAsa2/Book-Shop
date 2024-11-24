/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-require-imports */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    title: {
        type: String,
    },
    author: {
        type: String,
    },
    price: {
        type: Number,
        min: [0, "Price must be a positive number"],
        required: [true, "Price is required"],
    },
    category: {
        type: String,
        enum: {
            values: [
                'Fiction',
                'Science',
                'SelfDevelopment',
                'Poetry',
                'Religious',
            ],
            message: 'Category must be Fiction or Science or SelfDevelopment or Poetry or Religious',
        },
    },
    description: {
        type: String,
    },
    quantity: {
        type: Number,
        min: [0, "Quantity must be a positive number"],
        required: [true, "Quantity is required"],
    },
    inStock: {
        type: Boolean,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});
productSchema.pre('save', function (next) {
    this.createdAt = new Date();
    this.updatedAt = new Date();
    next();
});
exports.Product = (0, mongoose_1.model)('Products', productSchema);
