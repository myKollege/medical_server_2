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
exports.deleteUsersByGroupNameFromDB = exports.deleteFromDb = exports.updateUserInDB = exports.getAllUserFromDB = exports.getUserFromDB = exports.createUserToDB = void 0;
const user_model_1 = __importDefault(require("./user.model"));
const createUserToDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const item = new user_model_1.default(payload);
        yield item.save();
        return item;
    }
    catch (error) {
        console.error("Error creating user:", error);
        return null;
    }
});
exports.createUserToDB = createUserToDB;
const getUserFromDB = (nameQuery, sortQuery, idQuery, phoneQuery, skip, limit, type, serviceCategoryId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let query = {};
        // If name is provided, filter by name
        if (nameQuery) {
            query.fullName = { $regex: nameQuery, $options: "i" };
        }
        if (idQuery) {
            query._id = idQuery;
        }
        if (type) {
            query.userType = type;
        }
        if (serviceCategoryId) {
            query.serviceCategoryId = serviceCategoryId;
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
            result = yield user_model_1.default.find(query).sort(sort).skip(skip).limit(limit);
        }
        else {
            // Apply pagination
            result = yield user_model_1.default.find(query).sort(sort);
        }
        return result;
    }
    catch (error) {
        console.error("Error fetching users:", error);
        return [];
    }
});
exports.getUserFromDB = getUserFromDB;
const getAllUserFromDB = (name, id, phone, eventId, eventUserId) => __awaiter(void 0, void 0, void 0, function* () {
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
        if (eventUserId) {
            query.eventUserId = eventUserId;
        }
        const result = yield user_model_1.default.find().find(query).sort({ firstName: 1 });
        return result;
    }
    catch (error) {
        console.error("Error fetching users from the database:", error);
        throw error;
    }
});
exports.getAllUserFromDB = getAllUserFromDB;
const updateUserInDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(id, payload);
        const updatedUser = yield user_model_1.default.findByIdAndUpdate(id, payload, {
            new: true,
        });
        return updatedUser;
    }
    catch (error) {
        console.error("Error updating user:", error);
        return null;
    }
});
exports.updateUserInDB = updateUserInDB;
const deleteFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedUser = yield user_model_1.default.findByIdAndDelete(id);
        return deletedUser;
    }
    catch (error) {
        console.error("Error deleting user:", error);
        return null;
    }
});
exports.deleteFromDb = deleteFromDb;
const deleteUsersByGroupNameFromDB = (userGroupName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Find users with the specified userGroupName
        const usersToDelete = yield user_model_1.default.find({ userGroupName });
        // Delete each user one by one
        const deletionResults = yield Promise.all(usersToDelete.map((user) => __awaiter(void 0, void 0, void 0, function* () {
            const deletedUser = yield user_model_1.default.findByIdAndDelete(user._id);
            return deletedUser;
        })));
        return deletionResults;
    }
    catch (error) {
        console.error("Error deleting users by group name:", error);
        return null;
    }
});
exports.deleteUsersByGroupNameFromDB = deleteUsersByGroupNameFromDB;
