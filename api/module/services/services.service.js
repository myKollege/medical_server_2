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
exports.deleteServicesByGroupNameFromDB = exports.deleteFromDb = exports.updateServiceInDB = exports.getAllServiceFromDB = exports.getServiceFromDB = exports.createServiceToDB = void 0;
const services_model_1 = __importDefault(require("./services.model"));
const createServiceToDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const item = new services_model_1.default(payload);
        yield item.save();
        return item;
    }
    catch (error) {
        console.error("Error creating Service:", error);
        return null;
    }
});
exports.createServiceToDB = createServiceToDB;
const getServiceFromDB = (nameQuery, sortQuery, idQuery, skip, limit, idList) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let query = {};
        // If name is provided, filter by name
        if (nameQuery) {
            query.fullName = { $regex: nameQuery, $options: "i" };
        }
        if (idQuery) {
            query._id = idQuery;
        }
        if (idList) {
            // const ids = (idList as string).split(",");
            console.log(idList, "------");
            query._id = { $in: idList };
        }
        // Sorting based on sortQuery
        let sort = { created_at: 1 }; // Default
        if (sortQuery && sortQuery.toLowerCase() === "desc") {
            sort = { created_at: -1 }; // descending order
        }
        let result;
        if (limit) {
            // Apply pagination
            result = yield services_model_1.default.find(query).sort(sort).skip(skip).limit(limit);
        }
        else {
            // Apply pagination
            result = yield services_model_1.default.find(query).sort(sort);
        }
        return result;
    }
    catch (error) {
        console.error("Error fetching Services:", error);
        return [];
    }
});
exports.getServiceFromDB = getServiceFromDB;
const getAllServiceFromDB = (name, id, phone, eventId, eventServiceId) => __awaiter(void 0, void 0, void 0, function* () {
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
        if (eventServiceId) {
            query.eventServiceId = eventServiceId;
        }
        const result = yield services_model_1.default.find().find(query).sort({ firstName: 1 });
        return result;
    }
    catch (error) {
        console.error("Error fetching Services from the database:", error);
        throw error;
    }
});
exports.getAllServiceFromDB = getAllServiceFromDB;
const updateServiceInDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(id, payload);
        const updatedService = yield services_model_1.default.findByIdAndUpdate(id, payload, {
            new: true,
        });
        return updatedService;
    }
    catch (error) {
        console.error("Error updating Service:", error);
        return null;
    }
});
exports.updateServiceInDB = updateServiceInDB;
const deleteFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedService = yield services_model_1.default.findByIdAndDelete(id);
        return deletedService;
    }
    catch (error) {
        console.error("Error deleting Service:", error);
        return null;
    }
});
exports.deleteFromDb = deleteFromDb;
const deleteServicesByGroupNameFromDB = (ServiceGroupName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Find Services with the specified ServiceGroupName
        const ServicesToDelete = yield services_model_1.default.find({ ServiceGroupName });
        // Delete each Service one by one
        const deletionResults = yield Promise.all(ServicesToDelete.map((service) => __awaiter(void 0, void 0, void 0, function* () {
            const deletedService = yield services_model_1.default.findByIdAndDelete(service._id);
            return deletedService;
        })));
        return deletionResults;
    }
    catch (error) {
        console.error("Error deleting Services by group name:", error);
        return null;
    }
});
exports.deleteServicesByGroupNameFromDB = deleteServicesByGroupNameFromDB;
