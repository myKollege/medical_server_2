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
exports.deleteDoctorsByGroupNameFromDB = exports.deleteFromDb = exports.updateDoctorInDB = exports.getAllDoctorFromDB = exports.getDoctorFromDBByUserIds = exports.getDoctorFromDB = exports.createHospitalDoctorToDB = exports.createDoctorToDB = void 0;
const user_model_1 = __importDefault(require("../user/user.model"));
const doctors_model_1 = __importDefault(require("./doctors.model"));
const createDoctorToDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const item = new doctors_model_1.default(payload);
        yield item.save();
        return item;
    }
    catch (error) {
        console.error("Error creating Doctor:", error);
        return null;
    }
});
exports.createDoctorToDB = createDoctorToDB;
const createHospitalDoctorToDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(payload);
        const user = new user_model_1.default({
            fullName: payload === null || payload === void 0 ? void 0 : payload.name,
            //@ts-ignore
            email: payload === null || payload === void 0 ? void 0 : payload.email,
        });
        yield user.save();
        // ===============================================================
        const item = new doctors_model_1.default(Object.assign(Object.assign({}, payload), { userId: user === null || user === void 0 ? void 0 : user._id }));
        //=================================================================
        yield item.save();
        return item;
    }
    catch (error) {
        console.error("Error creating Doctor:", error);
        return null;
    }
});
exports.createHospitalDoctorToDB = createHospitalDoctorToDB;
const getDoctorFromDB = (nameQuery, sortQuery, idQuery, skip, limit, userId, userIds, hospitalId, allQuery) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let query = {};
        // If name is provided, filter by name
        if (nameQuery) {
            query.name = { $regex: nameQuery, $options: "i" };
        }
        if (allQuery) {
            query.$or = [
                { name: { $regex: allQuery, $options: "i" } },
                { specialization: { $regex: allQuery, $options: "i" } },
                { tags: { $elemMatch: { $regex: allQuery, $options: "i" } } },
            ];
        }
        if (idQuery) {
            query._id = idQuery;
        }
        if (hospitalId) {
            query.hospitalId = hospitalId;
        }
        if (userId) {
            query.userId = userId;
        }
        if (userIds && userIds.length > 0) {
            query._id = { $in: userIds };
        }
        // Sorting based on sortQuery
        let sort = { created_at: 1 }; // Default
        if (sortQuery && sortQuery.toLowerCase() === "desc") {
            sort = { created_at: -1 }; // descending order
        }
        let result;
        if (limit) {
            // Apply pagination
            result = yield doctors_model_1.default.find(query).sort(sort).skip(skip).limit(limit);
        }
        else {
            // Apply pagination
            result = yield doctors_model_1.default.find(query).sort(sort);
        }
        return result;
    }
    catch (error) {
        console.error("Error fetching Doctors:", error);
        return [];
    }
});
exports.getDoctorFromDB = getDoctorFromDB;
const getDoctorFromDBByUserIds = (userIds) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let query = {};
        let doctors = [];
        console.log(userIds, "oooooooooooooooooooooooooooo");
        // Sorting based on sortQuery
        let sort = { created_at: 1 };
        if (userIds && userIds.length > 0) {
            userIds.map((item) => __awaiter(void 0, void 0, void 0, function* () {
                query._id = item;
                let result = yield doctors_model_1.default.find(query).sort(sort);
                doctors.push(result);
            }));
        }
        console.log(doctors, "------------------------");
        return doctors;
    }
    catch (error) {
        console.error("Error fetching Doctors:", error);
        return [];
    }
});
exports.getDoctorFromDBByUserIds = getDoctorFromDBByUserIds;
const getAllDoctorFromDB = (name, id, phone, eventId, eventDoctorId) => __awaiter(void 0, void 0, void 0, function* () {
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
        if (eventDoctorId) {
            query.eventDoctorId = eventDoctorId;
        }
        const result = yield doctors_model_1.default.find().find(query).sort({ firstName: 1 });
        return result;
    }
    catch (error) {
        console.error("Error fetching Doctors from the database:", error);
        throw error;
    }
});
exports.getAllDoctorFromDB = getAllDoctorFromDB;
const updateDoctorInDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const { _id, ...updatedPayload } = payload;
        // const newData = payload?.map(item =>{
        //   return
        // } )
        // const updatedDoctor = await Doctor.findByIdAndUpdate(id, payload, {
        //   new: true,
        // });
        const updatedDoctor = yield doctors_model_1.default.findOneAndUpdate({ userId: id }, { $set: payload }, { new: true });
        console.log(updatedDoctor, "000  ======  000");
        return updatedDoctor;
    }
    catch (error) {
        console.error("Error updating Doctor:", error);
        return null;
    }
});
exports.updateDoctorInDB = updateDoctorInDB;
const deleteFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedDoctor = yield doctors_model_1.default.findByIdAndDelete(id);
        return deletedDoctor;
    }
    catch (error) {
        console.error("Error deleting Doctor:", error);
        return null;
    }
});
exports.deleteFromDb = deleteFromDb;
const deleteDoctorsByGroupNameFromDB = (DoctorGroupName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Find Doctors with the specified DoctorGroupName
        const DoctorsToDelete = yield doctors_model_1.default.find({ DoctorGroupName });
        // Delete each Doctor one by one
        const deletionResults = yield Promise.all(DoctorsToDelete.map((doctor) => __awaiter(void 0, void 0, void 0, function* () {
            const deletedDoctor = yield doctors_model_1.default.findByIdAndDelete(doctor._id);
            return deletedDoctor;
        })));
        return deletionResults;
    }
    catch (error) {
        console.error("Error deleting Doctors by group name:", error);
        return null;
    }
});
exports.deleteDoctorsByGroupNameFromDB = deleteDoctorsByGroupNameFromDB;
