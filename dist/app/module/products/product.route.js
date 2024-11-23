"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoute = void 0;
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
const router = express_1.default.Router();
//routes for products
router.post("/", product_controller_1.productController.createProduct);
router.get("/", product_controller_1.productController.getAllProducts);
router.get("/:productId", product_controller_1.productController.getProductById);
router.put("/:productId", product_controller_1.productController.updateProduct);
router.delete("/:productId", product_controller_1.productController.deleteProduct);
exports.productRoute = router;
