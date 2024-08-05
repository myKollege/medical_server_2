"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const services_controller_1 = require("./services.controller");
const router = express_1.default.Router();
router.post("/create", services_controller_1.createService);
router.patch("/update/:id", services_controller_1.updateService);
router.get("/list", services_controller_1.getService);
router.delete("/delete/:id", services_controller_1.deleteItem);
exports.default = router;
