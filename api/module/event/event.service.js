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
exports.deleteFromDb = exports.updateEventInDB = exports.getEventFromDB = exports.createEventToDB = void 0;
const event_model_1 = __importDefault(require("./event.model"));
const createEventToDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const item = new event_model_1.default(payload);
        yield item.save();
        return item;
    }
    catch (e) {
        console.error("Error creating event:", e);
        return null;
    }
});
exports.createEventToDB = createEventToDB;
const getEventFromDB = (nameQuery, sortQuery, idQuery) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let query = {};
        // If name is provided, filter by name
        if (nameQuery) {
            query.name = { $regex: nameQuery, $options: "i" };
        }
        if (idQuery) {
            query._id = idQuery;
        }
        // Sorting based on sortQuery
        let sort = { created_at: 1 }; // Default
        if (sortQuery && sortQuery.toLowerCase() === "desc") {
            sort = { created_at: -1 }; // descending order
        }
        const result = yield event_model_1.default.find(query).sort(sort);
        return result;
    }
    catch (e) {
        console.error("Error fetching events:", e);
        return [];
    }
});
exports.getEventFromDB = getEventFromDB;
const updateEventInDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedEvent = yield event_model_1.default.findByIdAndUpdate(id, payload, {
            new: true,
        });
        console.log(updatedEvent, "oooooooooooooooooo ----------- oo");
        return updatedEvent;
    }
    catch (e) {
        console.error("Error updating event:", e);
        return null;
    }
});
exports.updateEventInDB = updateEventInDB;
const deleteFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedEvent = yield event_model_1.default.findByIdAndDelete(id);
        return deletedEvent;
    }
    catch (e) {
        console.error("Error deleting event:", e);
        return null;
    }
});
exports.deleteFromDb = deleteFromDb;
