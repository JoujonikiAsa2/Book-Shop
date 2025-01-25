"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const handleZodError_1 = require("../errors/handleZodError");
const handleValidationError_1 = __importDefault(require("../errors/handleValidationError"));
const handleCastError_1 = __importDefault(require("../errors/handleCastError"));
const handleDuplicatError_1 = __importDefault(require("../errors/handleDuplicatError"));
const AppError_1 = __importDefault(require("../errors/AppError"));
// global error handler
const globalErrorHandler = (err, req, res, next) => {
    let statusCode = 500;
    let message = 'Something went wrong';
    let errorSources = [
        {
            path: '',
            message: 'Something went wrong',
        },
    ];
    if (err instanceof zod_1.ZodError) {
        const error = (0, handleZodError_1.handleZodError)(err);
        statusCode = error.statusCode;
        message = error.message;
        errorSources = error.errorSources;
    }
    else if (err.name === 'ValidationError') {
        const error = (0, handleValidationError_1.default)(err);
        statusCode = error.statusCode;
        message = error.message;
        errorSources = error.errorSources;
    }
    else if (err.name === 'CastError') {
        const error = (0, handleCastError_1.default)(err);
        statusCode = error.statusCode;
        message = error.message;
        errorSources = error.errorSources;
    }
    else if (err.code === 11000) {
        const error = (0, handleDuplicatError_1.default)(err);
        statusCode = error.statusCode;
        message = error.message;
        errorSources = error.errorSources;
    }
    else if (err instanceof AppError_1.default) {
        statusCode = err === null || err === void 0 ? void 0 : err.statusCode;
        message = err.message;
        errorSources = [
            {
                path: '',
                message: err === null || err === void 0 ? void 0 : err.message,
            },
        ];
    }
    else if (err instanceof Error) {
        message = err.message;
        errorSources = [
            {
                path: '',
                message: err === null || err === void 0 ? void 0 : err.message,
            },
        ];
    }
    res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        stack: process.env.NODE_ENV === 'development' ? err.stack : null,
    });
    next();
};
exports.default = globalErrorHandler;
