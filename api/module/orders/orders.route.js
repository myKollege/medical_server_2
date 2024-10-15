"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orders_controller_1 = require("./orders.controller");
const router = express_1.default.Router();
router.post("/create", orders_controller_1.createOrder);
router.patch("/update/:id", orders_controller_1.updateOrder);
router.get("/list", orders_controller_1.getOrder);
router.delete("/delete/:id", orders_controller_1.deleteItem);
exports.default = router;
