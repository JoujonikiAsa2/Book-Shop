"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiResponseHandler = void 0;
const apiResponseHandler = (res, response) => {
    const { statusCode, success, message, meta, data } = response;
    res.status(statusCode).json({
        success,
        message,
        meta,
        data,
    });
};
exports.apiResponseHandler = apiResponseHandler;
