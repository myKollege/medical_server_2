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
exports.deleteReportssByGroupNameFromDB = exports.deleteFromDb = exports.updateReportsInDB = exports.getAllReportsFromDB = exports.getReportsFromDB = exports.createReportsToDB = void 0;
const reports_model_1 = __importDefault(require("./reports.model"));
const createReportsToDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const item = new reports_model_1.default(payload);
        yield item.save();
        return item;
    }
    catch (error) {
        console.error("Error creating Reports:", error);
        return null;
    }
});
exports.createReportsToDB = createReportsToDB;
const getReportsFromDB = (nameQuery, sortQuery, idQuery, skip, limit, servicesReceiverId, serviceProviderId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let query = {};
        // If name is provided, filter by name
        if (nameQuery) {
            query.fullName = { $regex: nameQuery, $options: "i" };
        }
        if (idQuery) {
            query._id = idQuery;
        }
        if (servicesReceiverId) {
            query.servicesReceiverId = servicesReceiverId;
        }
        if (serviceProviderId) {
            query.serviceProviderId = serviceProviderId;
        }
        // Sorting based on sortQuery
        let sort = { created_at: 1 }; // Default
        if (sortQuery && sortQuery.toLowerCase() === "desc") {
            sort = { created_at: -1 }; // descending order
        }
        let result;
        if (limit) {
            // Apply pagination
            result = yield reports_model_1.default.find(query).sort(sort).skip(skip).limit(limit);
        }
        else {
            // Apply pagination
            result = yield reports_model_1.default.find(query).sort(sort);
        }
        return result;
    }
    catch (error) {
        console.error("Error fetching Reportss:", error);
        return [];
    }
});
exports.getReportsFromDB = getReportsFromDB;
const getAllReportsFromDB = (name, id, phone, eventId, eventReportsId) => __awaiter(void 0, void 0, void 0, function* () {
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
        if (eventReportsId) {
            query.eventReportsId = eventReportsId;
        }
        const result = yield reports_model_1.default.find().find(query).sort({ firstName: 1 });
        return result;
    }
    catch (error) {
        console.error("Error fetching Reportss from the database:", error);
        throw error;
    }
});
exports.getAllReportsFromDB = getAllReportsFromDB;
const updateReportsInDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(id, payload);
        const updatedReports = yield reports_model_1.default.findByIdAndUpdate(id, payload, {
            new: true,
        });
        return updatedReports;
    }
    catch (error) {
        console.error("Error updating Reports:", error);
        return null;
    }
});
exports.updateReportsInDB = updateReportsInDB;
const deleteFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedReports = yield reports_model_1.default.findByIdAndDelete(id);
        return deletedReports;
    }
    catch (error) {
        console.error("Error deleting Reports:", error);
        return null;
    }
});
exports.deleteFromDb = deleteFromDb;
const deleteReportssByGroupNameFromDB = (ReportsGroupName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Find Reportss with the specified ReportsGroupName
        const ReportssToDelete = yield reports_model_1.default.find({
            ReportsGroupName,
        });
        // Delete each Reports one by one
        const deletionResults = yield Promise.all(ReportssToDelete.map((rep) => __awaiter(void 0, void 0, void 0, function* () {
            const deletedReports = yield reports_model_1.default.findByIdAndDelete(rep._id);
            return deletedReports;
        })));
        return deletionResults;
    }
    catch (error) {
        console.error("Error deleting Reportss by group name:", error);
        return null;
    }
});
exports.deleteReportssByGroupNameFromDB = deleteReportssByGroupNameFromDB;
