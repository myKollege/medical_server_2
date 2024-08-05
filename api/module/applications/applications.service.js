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
exports.deleteApplicationsByGroupNameFromDB = exports.deleteFromDb = exports.updateApplicationInDB = exports.getAllApplicationFromDB = exports.getApplicationFromDB = exports.createApplicationToDB = void 0;
const applications_model_1 = __importDefault(require("./applications.model"));
const createApplicationToDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const item = new applications_model_1.default(payload);
        yield item.save();
        return item;
    }
    catch (error) {
        console.error("Error creating Application:", error);
        return null;
    }
});
exports.createApplicationToDB = createApplicationToDB;
const getApplicationFromDB = (nameQuery, sortQuery, idQuery, phoneQuery, skip, limit, type, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let query = {};
        // If name is provided, filter by name
        if (nameQuery) {
            query.fullName = { $regex: nameQuery, $options: "i" };
            // query.fullName = { $regex: nameQuery, $options: "i" };
        }
        if (idQuery) {
            query._id = idQuery;
        }
        if (userId) {
            query.userId = userId;
        }
        if (phoneQuery) {
            query.phone = phoneQuery;
        }
        // Sorting based on sortQuery
        let sort = { created_at: 1 }; // Default
        if (sortQuery && sortQuery.toLowerCase() === "desc") {
            sort = { created_at: -1 }; // descending order
        }
        let result;
        if (limit) {
            // Apply pagination
            result = yield applications_model_1.default.find(query).sort(sort).skip(skip).limit(limit);
        }
        else {
            // Apply pagination
            result = yield applications_model_1.default.find(query).sort(sort);
        }
        return result;
    }
    catch (error) {
        console.error("Error fetching Applications:", error);
        return [];
    }
});
exports.getApplicationFromDB = getApplicationFromDB;
const getAllApplicationFromDB = (name, id, phone, eventId, eventApplicationId) => __awaiter(void 0, void 0, void 0, function* () {
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
        if (eventApplicationId) {
            query.eventApplicationId = eventApplicationId;
        }
        const result = yield applications_model_1.default.find().find(query).sort({ firstName: 1 });
        return result;
    }
    catch (error) {
        console.error("Error fetching Applications from the database:", error);
        throw error;
    }
});
exports.getAllApplicationFromDB = getAllApplicationFromDB;
const updateApplicationInDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log(id, payload);
        const updatedApplication = yield applications_model_1.default.findByIdAndUpdate(id, payload, {
            new: true,
        });
        return updatedApplication;
    }
    catch (error) {
        console.error("Error updating Application:", error);
        return null;
    }
});
exports.updateApplicationInDB = updateApplicationInDB;
const deleteFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedApplication = yield applications_model_1.default.findByIdAndDelete(id);
        return deletedApplication;
    }
    catch (error) {
        console.error("Error deleting Application:", error);
        return null;
    }
});
exports.deleteFromDb = deleteFromDb;
const deleteApplicationsByGroupNameFromDB = (ApplicationGroupName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Find Applications with the specified ApplicationGroupName
        const ApplicationsToDelete = yield applications_model_1.default.find({
            ApplicationGroupName,
        });
        // Delete each Application one by one
        const deletionResults = yield Promise.all(ApplicationsToDelete.map((item) => __awaiter(void 0, void 0, void 0, function* () {
            const deletedApplication = yield applications_model_1.default.findByIdAndDelete(item._id);
            return deletedApplication;
        })));
        return deletionResults;
    }
    catch (error) {
        console.error("Error deleting Applications by group name:", error);
        return null;
    }
});
exports.deleteApplicationsByGroupNameFromDB = deleteApplicationsByGroupNameFromDB;
