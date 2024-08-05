"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const schedule_controller_1 = require("./schedule.controller");
const router = express_1.default.Router();
// router.post("/create", createSchedule);
// router.patch("/update/:id", updateSchedule);
router.get("/list", schedule_controller_1.getSchedule);
router.delete("/delete/:id", schedule_controller_1.deleteItem);
exports.default = router;
