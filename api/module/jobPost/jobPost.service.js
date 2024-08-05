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
exports.deletePostsByGroupNameFromDB = exports.deleteFromDb = exports.updatePostInDB = exports.getAllPostFromDB = exports.getPostFromDB = exports.createPostToDB = void 0;
const jobPost_model_1 = __importDefault(require("./jobPost.model"));
const createPostToDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const item = new jobPost_model_1.default(payload);
        yield item.save();
        return item;
    }
    catch (error) {
        console.error("Error creating Post:", error);
        return null;
    }
});
exports.createPostToDB = createPostToDB;
const getPostFromDB = (nameQuery, sortQuery, idQuery, skip, limit, date, type, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let query = {};
        // If name is provided, filter by name
        if (nameQuery) {
            query.userName = { $regex: nameQuery, $options: "i" };
        }
        if (userId) {
            query.userId = userId;
        }
        if (idQuery) {
            query._id = idQuery;
        }
        if (date) {
            query.createdAt = { $lte: new Date(date) };
        }
        // Sorting based on sortQuery
        let sort = { created_at: 1 };
        if (sortQuery && sortQuery.toLowerCase() === "desc") {
            sort = { created_at: -1 };
        }
        let result;
        if (limit) {
            // Apply pagination
            result = yield jobPost_model_1.default.find(query).sort(sort).skip(skip).limit(limit);
        }
        else {
            // Apply pagination
            result = yield jobPost_model_1.default.find(query).sort(sort);
        }
        return result;
    }
    catch (error) {
        console.error("Error fetching Posts:", error);
        return [];
    }
});
exports.getPostFromDB = getPostFromDB;
const getAllPostFromDB = (name, id, phone, eventId, eventPostId) => __awaiter(void 0, void 0, void 0, function* () {
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
        if (eventPostId) {
            query.eventPostId = eventPostId;
        }
        const result = yield jobPost_model_1.default.find().find(query).sort({ firstName: 1 });
        return result;
    }
    catch (error) {
        console.error("Error fetching Posts from the database:", error);
        throw error;
    }
});
exports.getAllPostFromDB = getAllPostFromDB;
const updatePostInDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(id, payload);
        const updatedPost = yield jobPost_model_1.default.findByIdAndUpdate(id, payload, {
            new: true,
        });
        return updatedPost;
    }
    catch (error) {
        console.error("Error updating Post:", error);
        return null;
    }
});
exports.updatePostInDB = updatePostInDB;
const deleteFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedPost = yield jobPost_model_1.default.findByIdAndDelete(id);
        return deletedPost;
    }
    catch (error) {
        console.error("Error deleting Post:", error);
        return null;
    }
});
exports.deleteFromDb = deleteFromDb;
const deletePostsByGroupNameFromDB = (PostGroupName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Find Posts with the specified PostGroupName
        const PostsToDelete = yield jobPost_model_1.default.find({ PostGroupName });
        // Delete each Post one by one
        const deletionResults = yield Promise.all(PostsToDelete.map((post) => __awaiter(void 0, void 0, void 0, function* () {
            const deletedPost = yield jobPost_model_1.default.findByIdAndDelete(post._id);
            return deletedPost;
        })));
        return deletionResults;
    }
    catch (error) {
        console.error("Error deleting Posts by group name:", error);
        return null;
    }
});
exports.deletePostsByGroupNameFromDB = deletePostsByGroupNameFromDB;
