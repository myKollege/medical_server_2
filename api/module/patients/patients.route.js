"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patients_controller_1 = require("./patients.controller");
const router = express_1.default.Router();
router.post("/create", patients_controller_1.createCategory);
router.patch("/update/:id", patients_controller_1.updateCategory);
router.get("/list", patients_controller_1.getCategory);
router.delete("/delete/:id", patients_controller_1.deleteItem);
exports.default = router;
