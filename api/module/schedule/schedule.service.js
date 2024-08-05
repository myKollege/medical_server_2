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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSchedulesByGroupNameFromDB = exports.deleteFromDb = exports.updateScheduleInDB = exports.getAllScheduleFromDB = exports.getScheduleFromDB = exports.createScheduleToDB = void 0;
const schedule_model_1 = __importDefault(require("./schedule.model"));
const createScheduleToDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const item = new schedule_model_1.default(payload);
        yield item.save();
        return item;
    }
    catch (error) {
        console.error("Error creating Schedule:", error);
        return null;
    }
});
exports.createScheduleToDB = createScheduleToDB;
const getScheduleFromDB = (nameQuery, sortQuery, idQuery, skip, limit) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let query = {};
        // If name is provided, filter by name
        if (nameQuery) {
            query.fullName = { $regex: nameQuery, $options: "i" };
        }
        if (idQuery) {
            query._id = idQuery;
        }
        // Sorting based on sortQuery
        let sort = { created_at: 1 }; // Default
        if (sortQuery && sortQuery.toLowerCase() === "desc") {
            sort = { created_at: -1 }; // descending order
        }
        let result;
        if (limit) {
            // Apply pagination
            result = yield schedule_model_1.default.find(query).sort(sort).skip(skip).limit(limit);
        }
        else {
            // Apply pagination
            result = yield schedule_model_1.default.find(query).sort(sort);
        }
        return result;
    }
    catch (error) {
        console.error("Error fetching Schedules:", error);
        return [];
    }
});
exports.getScheduleFromDB = getScheduleFromDB;
const getAllScheduleFromDB = (name, id, phone, eventId, eventScheduleId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let query = {};
        if (name) {
            query.firstName = { $regex: name, $options: "i" };
        }
        if (id) {
            query._id = id;
        }
        if (phone) {
            query.phone = phone;
        }
        if (eventId) {
            query.eventId = eventId;
        }
        if (eventScheduleId) {
            query.eventScheduleId = eventScheduleId;
        }
        const result = yield schedule_model_1.default.find().find(query).sort({ firstName: 1 });
        return result;
    }
    catch (error) {
        console.error("Error fetching Schedules from the database:", error);
        throw error;
    }
});
exports.getAllScheduleFromDB = getAllScheduleFromDB;
const updateScheduleInDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(id, payload);
        const updatedSchedule = yield schedule_model_1.default.findByIdAndUpdate(id, payload, {
            new: true,
        });
        return updatedSchedule;
    }
    catch (error) {
        console.error("Error updating Schedule:", error);
        return null;
    }
});
exports.updateScheduleInDB = updateScheduleInDB;
const deleteFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedSchedule = yield schedule_model_1.default.findByIdAndDelete(id);
        return deletedSchedule;
    }
    catch (error) {
        console.error("Error deleting Schedule:", error);
        return null;
    }
});
exports.deleteFromDb = deleteFromDb;
const deleteSchedulesByGroupNameFromDB = (ScheduleGroupName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Find Schedules with the specified ScheduleGroupName
        const SchedulesToDelete = yield schedule_model_1.default.find({ ScheduleGroupName });
        // Delete each Schedule one by one
        const deletionResults = yield Promise.all(SchedulesToDelete.map((schedule) => __awaiter(void 0, void 0, void 0, function* () {
            const deletedSchedule = yield schedule_model_1.default.findByIdAndDelete(schedule._id);
            return deletedSchedule;
        })));
        return deletionResults;
    }
    catch (error) {
        console.error("Error deleting Schedules by group name:", error);
        return null;
    }
});
exports.deleteSchedulesByGroupNameFromDB = deleteSchedulesByGroupNameFromDB;
