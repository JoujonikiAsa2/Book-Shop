"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const error_middleware_1 = __importDefault(require("./app/config/error.middleware"));
const routes_1 = __importDefault(require("./app/routes"));
const app = (0, express_1.default)();
//middlewares
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/api', routes_1.default);
//home route for the application
app.get('/', (req, res) => {
    res.status(200).json({
        status: true,
        message: 'The application is running successfully 🚀'
    });
});
app.use(error_middleware_1.default);
exports.default = app;
