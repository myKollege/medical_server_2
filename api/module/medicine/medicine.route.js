"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const medicine_controller_1 = require("./medicine.controller");
const router = express_1.default.Router();
router.post("/create", medicine_controller_1.createProduct);
router.patch("/update/:id", medicine_controller_1.updateProduct);
router.get("/list", medicine_controller_1.getProduct);
router.delete("/delete/:id", medicine_controller_1.deleteItem);
exports.default = router;
