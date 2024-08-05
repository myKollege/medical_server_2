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
exports.deleteSubCategoryByGroupNameFromDB = exports.deleteFromDb = exports.updateSubCategoryInDB = exports.getAllSubCategoryFromDB = exports.getSubCategoryFromDB = exports.createSubCategoryToDB = void 0;
const subCategory_model_1 = __importDefault(require("./subCategory.model"));
const createSubCategoryToDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const item = new subCategory_model_1.default(payload);
        yield item.save();
        return item;
    }
    catch (error) {
        console.error("Error creating SubCategory:", error);
        return null;
    }
});
exports.createSubCategoryToDB = createSubCategoryToDB;
const getSubCategoryFromDB = (nameQuery, sortQuery, idQuery, skip, limit, catId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let query = {};
        // If name is provided, filter by name
        if (nameQuery) {
            query.fullName = { $regex: nameQuery, $options: "i" };
        }
        if (idQuery) {
            query._id = idQuery;
        }
        if (catId) {
            query.category_id = catId;
        }
        // Sorting based on sortQuery
        let sort = { created_at: 1 }; // Default
        if (sortQuery && sortQuery.toLowerCase() === "desc") {
            sort = { created_at: -1 }; // descending order
        }
        let result;
        if (limit) {
            // Apply pagination
            result = yield subCategory_model_1.default.find(query).sort(sort).skip(skip).limit(limit);
        }
        else {
            // Apply pagination
            result = yield subCategory_model_1.default.find(query).sort(sort);
        }
        return result;
    }
    catch (error) {
        console.error("Error fetching SubCategory:", error);
        return [];
    }
});
exports.getSubCategoryFromDB = getSubCategoryFromDB;
const getAllSubCategoryFromDB = (name, id, phone, eventId, eventSubCategoryId) => __awaiter(void 0, void 0, void 0, function* () {
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
        if (eventSubCategoryId) {
            query.eventSubCategoryId = eventSubCategoryId;
        }
        const result = yield subCategory_model_1.default.find().find(query).sort({ firstName: 1 });
        return result;
    }
    catch (error) {
        console.error("Error fetching SubCategory from the database:", error);
        throw error;
    }
});
exports.getAllSubCategoryFromDB = getAllSubCategoryFromDB;
const updateSubCategoryInDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(id, payload);
        const updatedSubCategory = yield subCategory_model_1.default.findByIdAndUpdate(id, payload, {
            new: true,
        });
        return updatedSubCategory;
    }
    catch (error) {
        console.error("Error updating SubCategory:", error);
        return null;
    }
});
exports.updateSubCategoryInDB = updateSubCategoryInDB;
const deleteFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedSubCategory = yield subCategory_model_1.default.findByIdAndDelete(id);
        return deletedSubCategory;
    }
    catch (error) {
        console.error("Error deleting SubCategory:", error);
        return null;
    }
});
exports.deleteFromDb = deleteFromDb;
const deleteSubCategoryByGroupNameFromDB = (SubCategoryGroupName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Find SubCategory with the specified SubCategoryGroupName
        const SubCategoryToDelete = yield subCategory_model_1.default.find({
            SubCategoryGroupName,
        });
        // Delete each SubCategory one by one
        const deletionResults = yield Promise.all(SubCategoryToDelete.map((cat) => __awaiter(void 0, void 0, void 0, function* () {
            const deletedSubCategory = yield subCategory_model_1.default.findByIdAndDelete(cat._id);
            return deletedSubCategory;
        })));
        return deletionResults;
    }
    catch (error) {
        console.error("Error deleting SubCategory by group name:", error);
        return null;
    }
});
exports.deleteSubCategoryByGroupNameFromDB = deleteSubCategoryByGroupNameFromDB;
