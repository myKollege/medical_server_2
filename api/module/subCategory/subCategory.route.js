"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const subCategory_controller_1 = require("./subCategory.controller");
const router = express_1.default.Router();
router.post("/create", subCategory_controller_1.createSubCategory);
router.patch("/update/:id", subCategory_controller_1.updateSubCategory);
router.get("/list", subCategory_controller_1.getSubCategory);
router.delete("/delete/:id", subCategory_controller_1.deleteItem);
exports.default = router;
