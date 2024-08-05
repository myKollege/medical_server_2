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
exports.deleteItem = exports.updateEvent = exports.getEvent = exports.createEvent = void 0;
const event_service_1 = require("./event.service");
// ==================== create  ======================
const createEvent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("here ======================");
        const data = req.body;
        const result = yield (0, event_service_1.createEventToDB)(data);
        res.status(200).json({
            status: "success",
            data: result,
            message: "Event created successfully",
        });
    }
    catch (err) {
        res.status(500).json({
            status: "error",
            message: `Event creation failed ${err}`,
        });
    }
});
exports.createEvent = createEvent;
// ==================== get all ======================
const getEvent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, sort, id } = req.query;
        const result = yield (0, event_service_1.getEventFromDB)(name, sort, id);
        // Check if events exist
        if (!result || result.length === 0) {
            // Sending response ============
            return res.status(404).json({
                message: "No events found",
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
            message: `Failed to fetch events: ${err}`,
        });
    }
});
exports.getEvent = getEvent;
const updateEvent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = req.body;
    const updatedReimbursement = yield (0, event_service_1.updateEventInDB)(id, data);
    res.status(200).json({
        status: "success",
        data: updatedReimbursement,
    });
});
exports.updateEvent = updateEvent;
const deleteItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield (0, event_service_1.deleteFromDb)(id);
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
