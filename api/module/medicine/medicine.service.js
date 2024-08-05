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
exports.deleteProductByGroupNameFromDB = exports.deleteFromDb = exports.updateProductInDB = exports.getAllProductFromDB = exports.getProductFromDB = exports.createProductToDB = void 0;
const medicine_model_1 = __importDefault(require("./medicine.model"));
const createProductToDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const item = new medicine_model_1.default(payload);
        yield item.save();
        return item;
    }
    catch (error) {
        console.error("Error creating Product:", error);
        return null;
    }
});
exports.createProductToDB = createProductToDB;
const getProductFromDB = (nameQuery, sortQuery, idQuery, skip, limit, categoryName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let query = {};
        // If name is provided, filter by name
        if (nameQuery) {
            query.name = { $regex: nameQuery, $options: "i" };
        }
        if (idQuery) {
            query._id = idQuery;
        }
        if (categoryName) {
            query.categoryName = categoryName;
        }
        // Sorting based on sortQuery
        let sort = { created_at: 1 }; // Default
        if (sortQuery && sortQuery.toLowerCase() === "desc") {
            sort = { created_at: -1 }; // descending order
        }
        let result;
        if (limit) {
            // Apply pagination
            result = yield medicine_model_1.default.find(query).sort(sort).skip(skip).limit(limit);
        }
        else {
            // Apply pagination
            result = yield medicine_model_1.default.find(query).sort(sort);
        }
        return result;
    }
    catch (error) {
        console.error("Error fetching Product:", error);
        return [];
    }
});
exports.getProductFromDB = getProductFromDB;
const getAllProductFromDB = (name, id, phone, eventId, eventProductId) => __awaiter(void 0, void 0, void 0, function* () {
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
        if (eventProductId) {
            query.eventProductId = eventProductId;
        }
        const result = yield medicine_model_1.default.find().find(query).sort({ firstName: 1 });
        return result;
    }
    catch (error) {
        console.error("Error fetching Product from the database:", error);
        throw error;
    }
});
exports.getAllProductFromDB = getAllProductFromDB;
const updateProductInDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(id, payload);
        const updatedProduct = yield medicine_model_1.default.findByIdAndUpdate(id, payload, {
            new: true,
        });
        return updatedProduct;
    }
    catch (error) {
        console.error("Error updating Product:", error);
        return null;
    }
});
exports.updateProductInDB = updateProductInDB;
const deleteFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedProduct = yield medicine_model_1.default.findByIdAndDelete(id);
        return deletedProduct;
    }
    catch (error) {
        console.error("Error deleting Product:", error);
        return null;
    }
});
exports.deleteFromDb = deleteFromDb;
const deleteProductByGroupNameFromDB = (ProductGroupName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Find Product with the specified ProductGroupName
        const ProductToDelete = yield medicine_model_1.default.find({ ProductGroupName });
        // Delete each Product one by one
        const deletionResults = yield Promise.all(ProductToDelete.map((cat) => __awaiter(void 0, void 0, void 0, function* () {
            const deletedProduct = yield medicine_model_1.default.findByIdAndDelete(cat._id);
            return deletedProduct;
        })));
        return deletionResults;
    }
    catch (error) {
        console.error("Error deleting Product by group name:", error);
        return null;
    }
});
exports.deleteProductByGroupNameFromDB = deleteProductByGroupNameFromDB;
