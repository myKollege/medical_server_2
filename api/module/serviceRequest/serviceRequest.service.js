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
exports.deleteServiceRequestByGroupNameFromDB = exports.deleteFromDb = exports.updateServiceRequestInDB = exports.getAllServiceRequestFromDB = exports.getServiceRequestFromDB = exports.createServiceRequestToDB = void 0;
const serviceRequest_model_1 = __importDefault(require("./serviceRequest.model"));
const createServiceRequestToDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const item = new serviceRequest_model_1.default(payload);
        yield item.save();
        return item;
    }
    catch (error) {
        console.error("Error creating ServiceRequest:", error);
        return null;
    }
});
exports.createServiceRequestToDB = createServiceRequestToDB;
const getServiceRequestFromDB = (nameQuery, sortQuery, idQuery, skip, limit, ServiceRequestFor, servicesReceiverId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let query = {};
        // If name is provided, filter by name
        if (nameQuery) {
            query.ServiceRequestName = { $regex: nameQuery, $options: "i" };
        }
        if (idQuery) {
            query._id = idQuery;
        }
        if (servicesReceiverId) {
            query.servicesReceiverId = servicesReceiverId;
        }
        if (ServiceRequestFor) {
            query.ServiceRequestFor = ServiceRequestFor;
        }
        // Sorting based on sortQuery
        let sort = { created_at: 1 }; // Default
        if (sortQuery && sortQuery.toLowerCase() === "desc") {
            sort = { created_at: -1 }; // descending order
        }
        let result;
        if (limit) {
            // Apply pagination
            result = yield serviceRequest_model_1.default.find(query)
                .sort(sort)
                .skip(skip)
                .limit(limit);
        }
        else {
            // Apply pagination
            result = yield serviceRequest_model_1.default.find(query).sort(sort);
        }
        return result;
    }
    catch (error) {
        console.error("Error fetching ServiceRequest:", error);
        return [];
    }
});
exports.getServiceRequestFromDB = getServiceRequestFromDB;
const getAllServiceRequestFromDB = (name, id, phone, eventId, eventServiceRequestId) => __awaiter(void 0, void 0, void 0, function* () {
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
        if (eventServiceRequestId) {
            query.eventServiceRequestId = eventServiceRequestId;
        }
        const result = yield serviceRequest_model_1.default.find()
            .find(query)
            .sort({ firstName: 1 });
        return result;
    }
    catch (error) {
        console.error("Error fetching ServiceRequest from the database:", error);
        throw error;
    }
});
exports.getAllServiceRequestFromDB = getAllServiceRequestFromDB;
const updateServiceRequestInDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(id, payload);
        const updatedServiceRequest = yield serviceRequest_model_1.default.findByIdAndUpdate(id, payload, {
            new: true,
        });
        return updatedServiceRequest;
    }
    catch (error) {
        console.error("Error updating ServiceRequest:", error);
        return null;
    }
});
exports.updateServiceRequestInDB = updateServiceRequestInDB;
const deleteFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedServiceRequest = yield serviceRequest_model_1.default.findByIdAndDelete(id);
        return deletedServiceRequest;
    }
    catch (error) {
        console.error("Error deleting ServiceRequest:", error);
        return null;
    }
});
exports.deleteFromDb = deleteFromDb;
const deleteServiceRequestByGroupNameFromDB = (ServiceRequestGroupName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Find ServiceRequest with the specified ServiceRequestGroupName
        const ServiceRequestToDelete = yield serviceRequest_model_1.default.find({
            ServiceRequestGroupName,
        });
        // Delete each ServiceRequest one by one
        const deletionResults = yield Promise.all(ServiceRequestToDelete.map((cat) => __awaiter(void 0, void 0, void 0, function* () {
            const deletedServiceRequest = yield serviceRequest_model_1.default.findByIdAndDelete(cat._id);
            return deletedServiceRequest;
        })));
        return deletionResults;
    }
    catch (error) {
        console.error("Error deleting ServiceRequest by group name:", error);
        return null;
    }
});
exports.deleteServiceRequestByGroupNameFromDB = deleteServiceRequestByGroupNameFromDB;
