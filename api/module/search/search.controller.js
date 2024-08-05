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
exports.searchAllData = void 0;
const doctors_model_1 = __importDefault(require("../doctors/doctors.model"));
const medicine_model_1 = __importDefault(require("../medicine/medicine.model"));
const hospital_model_1 = __importDefault(require("../hospital/hospital.model"));
const searchAllData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { name, city } = req.query;
        const doctors = yield doctors_model_1.default.find({
            name: { $regex: name, $options: "i" },
        })
            .sort({ name: 1 })
            .limit(2);
        const products = yield medicine_model_1.default.find({
            name: { $regex: name, $options: "i" },
        })
            .sort({ name: 1 })
            .limit(2);
        const hospitals = yield ((_a = hospital_model_1.default.find({
            hospitalName: { $regex: name, $options: "i" },
        })
            .sort({ name: 1 })) === null || _a === void 0 ? void 0 : _a.limit(2));
        // // Check if users exist
        // Sending response
        return res.status(404).json({
            message: "No User found",
            status: "error",
            data: {
                products,
                doctors,
                hospitals,
            },
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
exports.searchAllData = searchAllData;
