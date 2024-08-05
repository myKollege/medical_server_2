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
exports.deleteReviewByGroupNameFromDB = exports.deleteFromDb = exports.updateReviewInDB = exports.getAllReviewFromDB = exports.getReviewFromDB = exports.createReviewToDB = void 0;
const reviews_model_1 = __importDefault(require("./reviews.model"));
const createReviewToDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const item = new reviews_model_1.default(payload);
        yield item.save();
        return item;
    }
    catch (error) {
        console.error("Error creating Review:", error);
        return null;
    }
});
exports.createReviewToDB = createReviewToDB;
const getReviewFromDB = (nameQuery, sortQuery, idQuery, skip, limit, type) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let query = {};
        // If name is provided, filter by name
        if (nameQuery) {
            query.$or = [
                { reviewSubjectName: { $regex: nameQuery, $options: "i" } },
                { reviewerName: { $regex: nameQuery, $options: "i" } },
            ];
        }
        if (idQuery) {
            query._id = idQuery;
        }
        if (type) {
            query.reviewFor = type;
        }
        // Sorting based on sortQuery
        let sort = { created_at: 1 }; // Default
        if (sortQuery && sortQuery.toLowerCase() === "desc") {
            sort = { created_at: -1 }; // descending order
        }
        let result;
        if (limit) {
            // Apply pagination
            result = yield reviews_model_1.default.find(query).sort(sort).skip(skip).limit(limit);
        }
        else {
            // Apply pagination
            result = yield reviews_model_1.default.find(query).sort(sort);
        }
        return result;
    }
    catch (error) {
        console.error("Error fetching Review:", error);
        return [];
    }
});
exports.getReviewFromDB = getReviewFromDB;
const getAllReviewFromDB = (name, id, phone, eventId, eventReviewId) => __awaiter(void 0, void 0, void 0, function* () {
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
        if (eventReviewId) {
            query.eventReviewId = eventReviewId;
        }
        const result = yield reviews_model_1.default.find().find(query).sort({ firstName: 1 });
        return result;
    }
    catch (error) {
        console.error("Error fetching Review from the database:", error);
        throw error;
    }
});
exports.getAllReviewFromDB = getAllReviewFromDB;
const updateReviewInDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(id, payload);
        const updatedReview = yield reviews_model_1.default.findByIdAndUpdate(id, payload, {
            new: true,
        });
        return updatedReview;
    }
    catch (error) {
        console.error("Error updating Review:", error);
        return null;
    }
});
exports.updateReviewInDB = updateReviewInDB;
const deleteFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedReview = yield reviews_model_1.default.findByIdAndDelete(id);
        return deletedReview;
    }
    catch (error) {
        console.error("Error deleting Review:", error);
        return null;
    }
});
exports.deleteFromDb = deleteFromDb;
const deleteReviewByGroupNameFromDB = (ReviewGroupName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Find Review with the specified ReviewGroupName
        const ReviewToDelete = yield reviews_model_1.default.find({ ReviewGroupName });
        // Delete each Review one by one
        const deletionResults = yield Promise.all(ReviewToDelete.map((cat) => __awaiter(void 0, void 0, void 0, function* () {
            const deletedReview = yield reviews_model_1.default.findByIdAndDelete(cat._id);
            return deletedReview;
        })));
        return deletionResults;
    }
    catch (error) {
        console.error("Error deleting Review by group name:", error);
        return null;
    }
});
exports.deleteReviewByGroupNameFromDB = deleteReviewByGroupNameFromDB;
