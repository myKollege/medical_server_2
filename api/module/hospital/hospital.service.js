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
exports.deleteHospitalsByGroupNameFromDB = exports.deleteFromDb = exports.updateHospitalInDB = exports.getAllHospitalFromDB = exports.getHospitalFromDB = exports.createHospitalToDB = void 0;
const hospital_model_1 = __importDefault(require("./hospital.model"));
const createHospitalToDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const item = new hospital_model_1.default(payload);
        yield item.save();
        return item;
    }
    catch (error) {
        console.error("Error creating Hospital:", error);
        return null;
    }
});
exports.createHospitalToDB = createHospitalToDB;
const getHospitalFromDB = (nameQuery, sortQuery, idQuery, skip, limit, userId, state, city) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let query = {};
        // If name is provided, filter by name
        if (nameQuery) {
            query.hospitalName = { $regex: nameQuery, $options: "i" };
        }
        if (idQuery) {
            query._id = idQuery;
        }
        if (userId) {
            query.userId = userId;
        }
        if (city || state) {
            query.location = {
                $elemMatch: Object.assign(Object.assign({}, (city && { city: { $regex: city, $options: "i" } })), (state && { state: { $regex: state, $options: "i" } })),
            };
        }
        // Sorting based on sortQuery
        let sort = { created_at: 1 }; // Default
        if (sortQuery && sortQuery.toLowerCase() === "desc") {
            sort = { created_at: -1 }; // descending order
        }
        let result;
        if (limit) {
            // Apply pagination
            result = yield hospital_model_1.default.find(query).sort(sort).skip(skip).limit(limit);
        }
        else {
            // Apply pagination
            result = yield hospital_model_1.default.find(query).sort(sort);
        }
        return result;
    }
    catch (error) {
        console.error("Error fetching Hospitals:", error);
        return [];
    }
});
exports.getHospitalFromDB = getHospitalFromDB;
const getAllHospitalFromDB = (name, sort, id, skip, limit, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let query = {};
        if (name) {
            query.firstName = { $regex: name, $options: "i" };
        }
        if (id) {
            query._id = id;
        }
        // if (phone) {
        //   query.phone = phone;
        // }
        // if (userId) {
        //   query.userId = userId;
        // }
        // if (eventHospitalId) {
        //   query.eventHospitalId = eventHospitalId;
        // }
        const result = yield hospital_model_1.default.find().find(query).sort({ firstName: 1 });
        return result;
    }
    catch (error) {
        console.error("Error fetching Hospitals from the database:", error);
        throw error;
    }
});
exports.getAllHospitalFromDB = getAllHospitalFromDB;
const updateHospitalInDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // if (payload._id) {
        //   delete payload._id;
        // }
        // const updatedHospital = await Hospital.findByIdAndUpdate(id, payload, {
        //   new: true,
        // });
        const updatedHospital = yield hospital_model_1.default.findOneAndUpdate({ userId: id }, { $set: payload }, { new: true });
        return updatedHospital;
    }
    catch (error) {
        console.error("Error updating Hospital:", error);
        return null;
    }
});
exports.updateHospitalInDB = updateHospitalInDB;
const deleteFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedHospital = yield hospital_model_1.default.findByIdAndDelete(id);
        return deletedHospital;
    }
    catch (error) {
        console.error("Error deleting Hospital:", error);
        return null;
    }
});
exports.deleteFromDb = deleteFromDb;
const deleteHospitalsByGroupNameFromDB = (HospitalGroupName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Find Hospitals with the specified HospitalGroupName
        const HospitalsToDelete = yield hospital_model_1.default.find({ HospitalGroupName });
        // Delete each Hospital one by one
        const deletionResults = yield Promise.all(HospitalsToDelete.map((hospital) => __awaiter(void 0, void 0, void 0, function* () {
            const deletedHospital = yield hospital_model_1.default.findByIdAndDelete(hospital._id);
            return deletedHospital;
        })));
        return deletionResults;
    }
    catch (error) {
        console.error("Error deleting Hospitals by group name:", error);
        return null;
    }
});
exports.deleteHospitalsByGroupNameFromDB = deleteHospitalsByGroupNameFromDB;
