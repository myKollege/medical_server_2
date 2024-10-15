"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const ReportsSchema = new mongoose_1.Schema({
    servicesReceiverId: { type: String, required: true },
    servicesReceiverName: { type: String, required: true },
    servicesReceiverPhoneNumber: { type: String, required: true },
    servicesReceiverGender: { type: String, required: true },
    servicesReceiverAge: { type: String, required: true },
    servicesReceiverNotes: { type: String, required: true },
    // Provider fields
    serviceProviderId: { type: String, required: true },
    serviceProviderName: { type: String, required: true },
    serviceProviderPhoneNumber: { type: String, required: true },
    serviceSpecialization: { type: String, required: true },
    serviceLocation: { type: String, required: true },
    image: { type: String, required: false }, // Optional image field
    // Reports URLs
    reportsUrls: [{ type: String, required: true }],
    // Conversions array
    conversions: [
        {
            user: { type: String, enum: ["provider", "receiver"], required: true },
            message: { type: String, required: true },
            id: { type: String, required: true },
        },
    ],
});
const Reports = mongoose_1.default.model("Reports", ReportsSchema);
exports.default = Reports;
