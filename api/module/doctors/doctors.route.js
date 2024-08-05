"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const doctors_controller_1 = require("./doctors.controller");
const router = express_1.default.Router();
router.post("/create", doctors_controller_1.createDoctor);
router.post("/create_hospital_doctor", doctors_controller_1.createHospitalDoctor);
router.post("/all_doctors", doctors_controller_1.getDoctorWithUserIds);
router.patch("/update/:id", doctors_controller_1.updateDoctor);
router.get("/list", doctors_controller_1.getDoctor);
router.delete("/delete/:id", doctors_controller_1.deleteItem);
exports.default = router;
