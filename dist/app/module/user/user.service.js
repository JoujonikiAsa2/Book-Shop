"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServices = void 0;
const queryBuilder_1 = __importDefault(require("../../builder/queryBuilder"));
const user_model_1 = require("./user.model");
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.create(payload);
    return result;
});
const makeAdmin = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findByIdAndUpdate({
        _id: id,
    }, {
        role: 'admin',
    }, { new: true });
    return result;
});
const getAllUsers = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const userQuery = new queryBuilder_1.default(user_model_1.User.find({}), query).search(['name']);
    const result = yield userQuery.modelQuery;
    return result;
});
exports.userServices = {
    getAllUsers,
    createUser,
    makeAdmin,
};
