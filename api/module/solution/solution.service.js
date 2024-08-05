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
exports.deleteSolutionByGroupNameFromDB = exports.deleteFromDb = exports.updateSolutionInDB = exports.getAllSolutionFromDB = exports.getSolutionFromDB = exports.createSolutionToDB = void 0;
const solution_model_1 = __importDefault(require("./solution.model"));
const createSolutionToDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const item = new solution_model_1.default(payload);
        yield item.save();
        return item;
    }
    catch (error) {
        console.error("Error creating Solution:", error);
        return null;
    }
});
exports.createSolutionToDB = createSolutionToDB;
const getSolutionFromDB = (nameQuery, sortQuery, idQuery, skip, limit) => __awaiter(void 0, void 0, void 0, function* () {
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
            result = yield solution_model_1.default.find(query).sort(sort).skip(skip).limit(limit);
        }
        else {
            // Apply pagination
            result = yield solution_model_1.default.find(query).sort(sort);
        }
        return result;
    }
    catch (error) {
        console.error("Error fetching Solution:", error);
        return [];
    }
});
exports.getSolutionFromDB = getSolutionFromDB;
const getAllSolutionFromDB = (name, id, phone, eventId, eventSolutionId) => __awaiter(void 0, void 0, void 0, function* () {
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
        if (eventSolutionId) {
            query.eventSolutionId = eventSolutionId;
        }
        const result = yield solution_model_1.default.find().find(query).sort({ firstName: 1 });
        return result;
    }
    catch (error) {
        console.error("Error fetching Solution from the database:", error);
        throw error;
    }
});
exports.getAllSolutionFromDB = getAllSolutionFromDB;
const updateSolutionInDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(id, payload);
        const updatedSolution = yield solution_model_1.default.findByIdAndUpdate(id, payload, {
            new: true,
        });
        return updatedSolution;
    }
    catch (error) {
        console.error("Error updating Solution:", error);
        return null;
    }
});
exports.updateSolutionInDB = updateSolutionInDB;
const deleteFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedSolution = yield solution_model_1.default.findByIdAndDelete(id);
        return deletedSolution;
    }
    catch (error) {
        console.error("Error deleting Solution:", error);
        return null;
    }
});
exports.deleteFromDb = deleteFromDb;
const deleteSolutionByGroupNameFromDB = (SolutionGroupName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Find Solution with the specified SolutionGroupName
        const SolutionToDelete = yield solution_model_1.default.find({ SolutionGroupName });
        // Delete each Solution one by one
        const deletionResults = yield Promise.all(SolutionToDelete.map((cat) => __awaiter(void 0, void 0, void 0, function* () {
            const deletedSolution = yield solution_model_1.default.findByIdAndDelete(cat._id);
            return deletedSolution;
        })));
        return deletionResults;
    }
    catch (error) {
        console.error("Error deleting Solution by group name:", error);
        return null;
    }
});
exports.deleteSolutionByGroupNameFromDB = deleteSolutionByGroupNameFromDB;
