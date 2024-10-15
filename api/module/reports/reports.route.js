"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const reports_controller_1 = require("./reports.controller");
const router = express_1.default.Router();
router.post("/create", reports_controller_1.createReports);
router.patch("/update/:id", reports_controller_1.updateReports);
router.get("/list", reports_controller_1.getReports);
router.delete("/delete/:id", reports_controller_1.deleteItem);
exports.default = router;
