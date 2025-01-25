"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// global error handler
const globalErrorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        message: err.message || "Something went wrong",
        success: false,
        error: {
            name: err.name,
            errors: err.errors,
        },
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    });
    next();
};
exports.default = globalErrorHandler;
