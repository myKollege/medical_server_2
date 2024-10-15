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
exports.deleteOrdersByGroupNameFromDB = exports.deleteFromDb = exports.updateOrderInDB = exports.getAllOrderFromDB = exports.getOrderFromDB = exports.createOrderToDB = void 0;
const orders_model_1 = __importDefault(require("./orders.model"));
const createOrderToDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const item = new orders_model_1.default(payload);
        yield item.save();
        return item;
    }
    catch (error) {
        console.error("Error creating Order:", error);
        return null;
    }
});
exports.createOrderToDB = createOrderToDB;
const getOrderFromDB = (nameQuery, sortQuery, idQuery, skip, limit, servicesReceiverId, serviceProviderId) => __awaiter(void 0, void 0, void 0, function* () {
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
            result = yield orders_model_1.default.find(query).sort(sort).skip(skip).limit(limit);
        }
        else {
            // Apply pagination
            result = yield orders_model_1.default.find(query).sort(sort);
        }
        return result;
    }
    catch (error) {
        console.error("Error fetching Orders:", error);
        return [];
    }
});
exports.getOrderFromDB = getOrderFromDB;
const getAllOrderFromDB = (name, id, phone, eventId, eventOrderId) => __awaiter(void 0, void 0, void 0, function* () {
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
        if (eventOrderId) {
            query.eventOrderId = eventOrderId;
        }
        const result = yield orders_model_1.default.find().find(query).sort({ firstName: 1 });
        return result;
    }
    catch (error) {
        console.error("Error fetching Orders from the database:", error);
        throw error;
    }
});
exports.getAllOrderFromDB = getAllOrderFromDB;
const updateOrderInDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(id, payload);
        const updatedOrder = yield orders_model_1.default.findByIdAndUpdate(id, payload, {
            new: true,
        });
        return updatedOrder;
    }
    catch (error) {
        console.error("Error updating Order:", error);
        return null;
    }
});
exports.updateOrderInDB = updateOrderInDB;
const deleteFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedOrder = yield orders_model_1.default.findByIdAndDelete(id);
        return deletedOrder;
    }
    catch (error) {
        console.error("Error deleting Order:", error);
        return null;
    }
});
exports.deleteFromDb = deleteFromDb;
const deleteOrdersByGroupNameFromDB = (OrderGroupName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Find Orders with the specified OrderGroupName
        const OrdersToDelete = yield orders_model_1.default.find({
            OrderGroupName,
        });
        // Delete each Order one by one
        const deletionResults = yield Promise.all(OrdersToDelete.map((rep) => __awaiter(void 0, void 0, void 0, function* () {
            const deletedOrder = yield orders_model_1.default.findByIdAndDelete(rep._id);
            return deletedOrder;
        })));
        return deletionResults;
    }
    catch (error) {
        console.error("Error deleting Orders by group name:", error);
        return null;
    }
});
exports.deleteOrdersByGroupNameFromDB = deleteOrdersByGroupNameFromDB;
