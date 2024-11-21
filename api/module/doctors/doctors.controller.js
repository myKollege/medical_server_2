"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteItem = exports.updateDoctor = exports.getDoctorWithUserIds = exports.getDoctor = exports.createHospitalDoctor = exports.createDoctor = void 0;
const doctors_service_1 = require("./doctors.service");
// ==================== create  ======================
const createDoctor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const result = yield (0, doctors_service_1.createDoctorToDB)(data);
        res.status(200).json({
            status: "success",
            data: result,
            message: "Doctor created successfully",
        });
    }
    catch (err) {
        res.status(500).json({
            status: "error",
            message: `Doctor creation failed ${err}`,
        });
    }
});
exports.createDoctor = createDoctor;
const createHospitalDoctor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const result = yield (0, doctors_service_1.createHospitalDoctorToDB)(data);
        res.status(200).json({
            status: "success",
            data: result,
            message: "Doctor created successfully",
        });
    }
    catch (err) {
        res.status(500).json({
            status: "error",
            message: `Doctor creation failed ${err}`,
        });
    }
});
exports.createHospitalDoctor = createHospitalDoctor;
// ==================== get all ================================
const getDoctor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, sort, id, query, page, limit, userId, userIds, hospitalId, state, city, gender, ratting, } = req.query;
        // Setting default values for page and limit
        const pageNumber = parseInt(page, 10) || 1;
        const pageSize = parseInt(limit, 10) || 10;
        // Calculate skip value for pagination
        const skip = (pageNumber - 1) * pageSize;
        // Getting data
        const result = yield (0, doctors_service_1.getDoctorFromDB)(name, sort, id, skip, limit, userId, userIds, hospitalId, query, state, city, gender, ratting);
        // Check if Doctors exist
        if (!result || result.length === 0) {
            // Sending response ============
            return res.status(404).json({
                message: "No Doctors found",
                data: [],
            });
        }
        res.status(200).json({
            status: "success",
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            status: "error",
            message: `Failed to fetch Doctors: ${err}`,
        });
    }
});
exports.getDoctor = getDoctor;
const getDoctorWithUserIds = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const result = yield (0, doctors_service_1.getDoctorFromDBByUserIds)(data === null || data === void 0 ? void 0 : data.userIds);
        // Check if Doctors exist ====================================
        if (!result || result.length === 0) {
            // Sending response ========================================
            return res.status(404).json({
                message: "No Doctors found",
                data: [],
            });
        }
        res.status(200).json({
            status: "success",
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            status: "error",
            message: `Failed to fetch Doctors: ${err}`,
        });
    }
});
exports.getDoctorWithUserIds = getDoctorWithUserIds;
const updateDoctor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = req.body;
    const updatedReimbursement = yield (0, doctors_service_1.updateDoctorInDB)(id, data);
    res.status(200).json({
        status: "success",
        data: updatedReimbursement,
    });
});
exports.updateDoctor = updateDoctor;
const deleteItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield (0, doctors_service_1.deleteFromDb)(id);
        if (!result) {
            return res.status(404).json({ error: "Item not found" });
        }
        res.status(200).json({ data: result, message: "deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting Folder:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.deleteItem = deleteItem;
