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
exports.deleteItem = exports.test = exports.updateBulkUser = exports.updateUser = exports.login = exports.getUser = exports.createBulkUser = exports.createUser = void 0;
const user_service_1 = require("./user.service");
const user_model_1 = __importDefault(require("./user.model"));
const doctors_model_1 = __importDefault(require("../doctors/doctors.model"));
const hospital_model_1 = __importDefault(require("../hospital/hospital.model"));
// ==================== create single user  ======================
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //====== getting data  from request =================
        const data = req.body;
        let result;
        if (!(data === null || data === void 0 ? void 0 : data.email) || !(data === null || data === void 0 ? void 0 : data.password)) {
            return res.status(400).json({
                status: "error",
                message: "Email and password are required",
            });
        }
        if (!(data === null || data === void 0 ? void 0 : data.userType)) {
            return res.status(400).json({
                status: "error",
                message: "User Type is required",
            });
        }
        if ((data === null || data === void 0 ? void 0 : data.userType) == "civil") {
            result = yield (0, user_service_1.createUserToDB)(Object.assign(Object.assign({}, data), { accountStatus: "approved" }));
        }
        else {
            result = yield (0, user_service_1.createUserToDB)(data);
        }
        if (result && (data === null || data === void 0 ? void 0 : data.userType) === "doctor") {
            const item = new doctors_model_1.default({
                userId: result === null || result === void 0 ? void 0 : result._id,
            });
            yield item.save();
        }
        else if (result && (data === null || data === void 0 ? void 0 : data.userType) === "hospitals") {
            const item = new hospital_model_1.default({
                userId: result === null || result === void 0 ? void 0 : result._id,
            });
            yield item.save();
        }
        // =======================================================
        res.status(200).json({
            status: "success",
            data: result,
            message: "User created successfully",
        });
    }
    catch (err) {
        res.status(500).json({
            status: "error",
            message: `User creation failed ${err}`,
        });
    }
});
exports.createUser = createUser;
// ==================== create single bulk user  ======================
const createBulkUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        let totalUserCreated = 0;
        if (data === null || data === void 0 ? void 0 : data.length) {
            for (let i = 0; i < data.length; i++) {
                const password = "123456";
                const result = yield (0, user_service_1.createUserToDB)(Object.assign(Object.assign({}, data[i]), { password: password }));
                if (result) {
                    totalUserCreated++;
                }
            }
        }
        res.status(200).json({
            status: "success",
            data: `${totalUserCreated} users created`,
            message: "User created successfully",
        });
    }
    catch (err) {
        res.status(500).json({
            status: "error",
            message: `User creation failed ${err}`,
        });
    }
});
exports.createBulkUser = createBulkUser;
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, sort, id, phone, page, limit, type, serviceCategoryId } = req.query;
        // Setting default values for page and limit
        const pageNumber = parseInt(page, 10) || 1;
        const pageSize = parseInt(limit, 10) || 10;
        // Calculate skip value for pagination
        const skip = (pageNumber - 1) * pageSize;
        // Getting data
        const result = yield (0, user_service_1.getUserFromDB)(name, sort, id, phone, skip, pageSize, type, serviceCategoryId);
        // Check if users exist
        if (!result || result.length === 0) {
            // Sending response
            return res.status(404).json({
                message: "No User found",
                status: "error",
                data: [],
            });
        }
        res.status(200).json({
            status: "success",
            data: result,
        });
    }
    catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({
            status: "error",
            message: "Failed to fetch user",
        });
    }
});
exports.getUser = getUser;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        console.log(email, password, "-------------");
        // Getting data
        const user = yield user_model_1.default.findOne({ email });
        // Check if folders exist
        if (!user) {
            return res.status(404).json({
                message: "No User found",
                data: null,
            });
        }
        if (user.password !== password) {
            return res.status(404).json({
                message: "Password is incorrect",
                data: null,
            });
        }
        res.status(200).json({
            status: "success",
            data: user,
        });
    }
    catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.login = login;
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const data = req.body;
        const updatedUser = yield (0, user_service_1.updateUserInDB)(id, data);
        res.status(200).json({
            status: "success",
            data: updatedUser,
        });
    }
    catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({
            status: "error",
            message: "Failed to update user",
        });
    }
});
exports.updateUser = updateUser;
const updateBulkUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const data = req.body;
        let totalUserUpdated = 0;
        if ((_a = data === null || data === void 0 ? void 0 : data.ids) === null || _a === void 0 ? void 0 : _a.length) {
            for (let i = 0; i < ((_b = data === null || data === void 0 ? void 0 : data.ids) === null || _b === void 0 ? void 0 : _b.length); i++) {
                const result = yield (0, user_service_1.updateUserInDB)(data === null || data === void 0 ? void 0 : data.ids[i], {
                    eventId: data === null || data === void 0 ? void 0 : data.eventId,
                    eventName: data === null || data === void 0 ? void 0 : data.eventName,
                });
                console.log(result);
                if (result) {
                    totalUserUpdated++;
                }
            }
        }
        res.status(200).json({
            status: "success",
            data: `${totalUserUpdated} user updated`,
        });
    }
    catch (error) {
        console.error("Error updating bulk user:", error);
        res.status(500).json({
            status: "error",
            message: "Failed to update bulk user",
        });
    }
});
exports.updateBulkUser = updateBulkUser;
const test = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usersToUpdate = yield user_model_1.default.find({ userGroupName: "batch-2" });
        const idsToUpdate = usersToUpdate.map((user) => user._id);
        // const result: any = await User.updateMany(
        //   { _id: { $in: idsToUpdate } },
        //   { $set: { eventId: "663b467e665197910f694f5b" } }
        // );
        const result = yield user_model_1.default.updateMany({ _id: { $in: idsToUpdate } }, { $set: { eventName: "FTSXIAOMI - Thailand Batch-2" } });
        res.status(200).json({
            status: "success",
            data: {
                data: usersToUpdate,
                usersUpdated: result.nModified,
                userIds: idsToUpdate,
            },
        });
    }
    catch (error) {
        console.error("Error updating bulk user:", error);
        res.status(500).json({
            status: "error",
            message: "Failed to update bulk user",
        });
    }
});
exports.test = test;
const deleteItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, groupName } = req.params;
        const result = yield (0, user_service_1.deleteFromDb)(id);
        if (!result) {
            return res.status(404).json({ error: "Item not found" });
        }
        res.status(200).json({ data: result, message: "deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting Folder:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.deleteItem = deleteItem;
