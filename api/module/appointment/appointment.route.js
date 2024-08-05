"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const appointment_controller_1 = require("./appointment.controller");
const router = express_1.default.Router();
router.post("/create", appointment_controller_1.createAppointment);
router.patch("/update/:id", appointment_controller_1.updateAppointment);
router.get("/list", appointment_controller_1.getAppointment);
router.delete("/delete/:id", appointment_controller_1.deleteItem);
exports.default = router;
