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
exports.deleteCategoryByGroupNameFromDB = exports.deleteFromDb = exports.updateCategoryInDB = exports.getAllCategoryFromDB = exports.getCategoryFromDB = exports.createCategoryToDB = void 0;
const category_model_1 = __importDefault(require("./category.model"));
const createCategoryToDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const item = new category_model_1.default(payload);
        yield item.save();
        return item;
    }
    catch (error) {
        console.error("Error creating Category:", error);
        return null;
    }
});
exports.createCategoryToDB = createCategoryToDB;
const getCategoryFromDB = (nameQuery, sortQuery, idQuery, skip, limit, categoryFor) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let query = {};
        // If name is provided, filter by name
        if (nameQuery) {
            query.categoryName = { $regex: nameQuery, $options: "i" };
        }
        if (idQuery) {
            query._id = idQuery;
        }
        if (categoryFor) {
            query.categoryFor = categoryFor;
        }
        // Sorting based on sortQuery
        let sort = { created_at: 1 }; // Default
        if (sortQuery && sortQuery.toLowerCase() === "desc") {
            sort = { created_at: -1 }; // descending order
        }
        let result;
        if (limit) {
            // Apply pagination
            result = yield category_model_1.default.find(query).sort(sort).skip(skip).limit(limit);
        }
        else {
            // Apply pagination
            result = yield category_model_1.default.find(query).sort(sort);
        }
        return result;
    }
    catch (error) {
        console.error("Error fetching Category:", error);
        return [];
    }
});
exports.getCategoryFromDB = getCategoryFromDB;
const getAllCategoryFromDB = (name, id, phone, eventId, eventCategoryId) => __awaiter(void 0, void 0, void 0, function* () {
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
        if (eventCategoryId) {
            query.eventCategoryId = eventCategoryId;
        }
        const result = yield category_model_1.default.find().find(query).sort({ firstName: 1 });
        return result;
    }
    catch (error) {
        console.error("Error fetching Category from the database:", error);
        throw error;
    }
});
exports.getAllCategoryFromDB = getAllCategoryFromDB;
const updateCategoryInDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(id, payload);
        const updatedCategory = yield category_model_1.default.findByIdAndUpdate(id, payload, {
            new: true,
        });
        return updatedCategory;
    }
    catch (error) {
        console.error("Error updating Category:", error);
        return null;
    }
});
exports.updateCategoryInDB = updateCategoryInDB;
const deleteFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedCategory = yield category_model_1.default.findByIdAndDelete(id);
        return deletedCategory;
    }
    catch (error) {
        console.error("Error deleting Category:", error);
        return null;
    }
});
exports.deleteFromDb = deleteFromDb;
const deleteCategoryByGroupNameFromDB = (CategoryGroupName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Find Category with the specified CategoryGroupName
        const CategoryToDelete = yield category_model_1.default.find({ CategoryGroupName });
        // Delete each Category one by one
        const deletionResults = yield Promise.all(CategoryToDelete.map((cat) => __awaiter(void 0, void 0, void 0, function* () {
            const deletedCategory = yield category_model_1.default.findByIdAndDelete(cat._id);
            return deletedCategory;
        })));
        return deletionResults;
    }
    catch (error) {
        console.error("Error deleting Category by group name:", error);
        return null;
    }
});
exports.deleteCategoryByGroupNameFromDB = deleteCategoryByGroupNameFromDB;
