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
exports.deleteAppointmentsByGroupNameFromDB = exports.deleteFromDb = exports.updateAppointmentInDB = exports.getAllAppointmentFromDB = exports.getAppointmentFromDB = exports.createAppointmentToDB = void 0;
const appointment_model_1 = __importDefault(require("./appointment.model"));
const createAppointmentToDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const item = new appointment_model_1.default(payload);
        yield item.save();
        return item;
    }
    catch (error) {
        console.error("Error creating Appointment:", error);
        return null;
    }
});
exports.createAppointmentToDB = createAppointmentToDB;
const getAppointmentFromDB = (nameQuery, sortQuery, idQuery, skip, limit, servicesReceiverId, serviceProviderId) => __awaiter(void 0, void 0, void 0, function* () {
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
            result = yield appointment_model_1.default.find(query).sort(sort).skip(skip).limit(limit);
        }
        else {
            // Apply pagination
            result = yield appointment_model_1.default.find(query).sort(sort);
        }
        return result;
    }
    catch (error) {
        console.error("Error fetching Appointments:", error);
        return [];
    }
});
exports.getAppointmentFromDB = getAppointmentFromDB;
const getAllAppointmentFromDB = (name, id, phone, eventId, eventAppointmentId) => __awaiter(void 0, void 0, void 0, function* () {
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
        if (eventAppointmentId) {
            query.eventAppointmentId = eventAppointmentId;
        }
        const result = yield appointment_model_1.default.find().find(query).sort({ firstName: 1 });
        return result;
    }
    catch (error) {
        console.error("Error fetching Appointments from the database:", error);
        throw error;
    }
});
exports.getAllAppointmentFromDB = getAllAppointmentFromDB;
const updateAppointmentInDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(id, payload);
        const updatedAppointment = yield appointment_model_1.default.findByIdAndUpdate(id, payload, {
            new: true,
        });
        return updatedAppointment;
    }
    catch (error) {
        console.error("Error updating Appointment:", error);
        return null;
    }
});
exports.updateAppointmentInDB = updateAppointmentInDB;
const deleteFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedAppointment = yield appointment_model_1.default.findByIdAndDelete(id);
        return deletedAppointment;
    }
    catch (error) {
        console.error("Error deleting Appointment:", error);
        return null;
    }
});
exports.deleteFromDb = deleteFromDb;
const deleteAppointmentsByGroupNameFromDB = (AppointmentGroupName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Find Appointments with the specified AppointmentGroupName
        const AppointmentsToDelete = yield appointment_model_1.default.find({
            AppointmentGroupName,
        });
        // Delete each Appointment one by one
        const deletionResults = yield Promise.all(AppointmentsToDelete.map((appointment) => __awaiter(void 0, void 0, void 0, function* () {
            const deletedAppointment = yield appointment_model_1.default.findByIdAndDelete(appointment._id);
            return deletedAppointment;
        })));
        return deletionResults;
    }
    catch (error) {
        console.error("Error deleting Appointments by group name:", error);
        return null;
    }
});
exports.deleteAppointmentsByGroupNameFromDB = deleteAppointmentsByGroupNameFromDB;
