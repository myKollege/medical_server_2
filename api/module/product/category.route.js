"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const category_controller_1 = require("./category.controller");
const router = express_1.default.Router();
router.post("/create", category_controller_1.createCategory);
router.patch("/update/:id", category_controller_1.updateCategory);
router.get("/list", category_controller_1.getCategory);
router.delete("/delete/:id", category_controller_1.deleteItem);
exports.default = router;
