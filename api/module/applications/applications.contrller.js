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
exports.deleteItem = exports.updateApplication = exports.getApplication = exports.createApplication = void 0;
const applications_service_1 = require("./applications.service");
// ==================== create single Application  ======================
const createApplication = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //====== getting data  from request =================
        const data = req.body;
        let result;
        result = yield (0, applications_service_1.createApplicationToDB)(data);
        console.log(result, "data ===========");
        res.status(200).json({
            status: "success",
            data: result,
            message: "Application created successfully",
        });
    }
    catch (err) {
        res.status(500).json({
            status: "error",
            message: `Application creation failed ${err}`,
        });
    }
});
exports.createApplication = createApplication;
const getApplication = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, sort, id, phone, page, limit, type, userId } = req.query;
        // Setting default values for page and limit
        const pageNumber = parseInt(page, 10) || 1;
        const pageSize = parseInt(limit, 10) || 10;
        // Calculate skip value for pagination
        const skip = (pageNumber - 1) * pageSize;
        // Getting data
        const result = yield (0, applications_service_1.getApplicationFromDB)(name, sort, id, phone, skip, pageSize, type, userId);
        // Check if Applications exist
        if (!result || result.length === 0) {
            // Sending response
            return res.status(404).json({
                message: "No Application found",
                status: "error",
                data: [],
            });
        }
        res.status(200).json({
            status: "success",
            data: result,
        });
    }
    catch (error) {
        console.error("Error fetching Application:", error);
        res.status(500).json({
            status: "error",
            message: "Failed to fetch Application",
        });
    }
});
exports.getApplication = getApplication;
const updateApplication = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const data = req.body;
        const updatedApplication = yield (0, applications_service_1.updateApplicationInDB)(id, data);
        console.log(updatedApplication, "------------ +++++++++", id);
        res.status(200).json({
            status: "success",
            data: updatedApplication,
        });
    }
    catch (error) {
        console.error("Error updating Application:", error);
        res.status(500).json({
            status: "error",
            message: "Failed to update Application",
        });
    }
});
exports.updateApplication = updateApplication;
const deleteItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, groupName } = req.params;
        const result = yield (0, applications_service_1.deleteFromDb)(id);
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
