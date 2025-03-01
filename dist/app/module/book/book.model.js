"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
//Creates a book schema
const productSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    imgUrl: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        min: [0, "Price must be a positive number"],
        required: true
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
    availability: {
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
exports.Product = (0, mongoose_1.model)('Products', productSchema);
