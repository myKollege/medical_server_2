"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const hospital_controller_1 = require("./hospital.controller");
const router = express_1.default.Router();
router.post("/create", hospital_controller_1.createHospital);
router.patch("/update/:id", hospital_controller_1.updateHospital);
router.get("/list", hospital_controller_1.getHospital);
router.delete("/delete/:id", hospital_controller_1.deleteItem);
exports.default = router;
