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
const HospitalSchema = new mongoose_1.Schema({
    hospitalId: { type: String },
    userId: { type: String, required: true },
    hospitalName: { type: String },
    hospitalAddress: { type: String },
    description: { type: String },
    coverImageUrl: { type: String },
    imageUrls: { type: [String] },
    tags: { type: [String] },
    phone: { type: String },
    email: { type: String },
    doctorIds: { type: [String] },
    serviceIds: { type: [String] },
    insuranceCompanyList: { type: [String] },
    amenities: { type: [String] },
    availableBeds: {
        type: [
            {
                bedType: {
                    type: String,
                    enum: ["single", "standard", "doubles", "premium"],
                },
                availableBeds: { type: Number },
            },
        ],
    },
    scheduleList: {
        type: [
            {
                day: {
                    type: String,
                    enum: [
                        "monday",
                        "tuesday",
                        "wednesday",
                        " thursday",
                        "friday",
                        "saturday",
                        "sunday",
                    ],
                },
                scheduleStartTime: { type: String },
                scheduleEndTime: { type: String },
                status: { type: String, enum: ["available", "unavailable"] },
            },
        ],
    },
    emergencyServices: { type: Boolean },
    urgentCare: { type: Boolean },
    surgeryServices: { type: Boolean },
    departments: {
        type: [
            {
                departmentName: { type: String },
                description: { type: String },
            },
        ],
    },
    averageRating: { type: Number },
    reviewCount: { type: Number },
    appointmentUrl: { type: String },
    insuranceNetwork: { type: [String] },
    location: {
        city: { type: String },
        state: { type: String },
        latitude: { type: String },
        longitude: { type: String },
        pinCode: { type: String },
        address: { type: String },
    },
    ratings: {
        type: [
            {
                userId: { type: String },
                rating: { type: Number },
                review: { type: String },
            },
        ],
    },
    services: {
        type: [
            {
                id: { type: String },
                serviceName: { type: String },
                serviceType: { type: String },
                serviceDescription: { type: String },
                serviceStartPrice: { type: Number },
                serviceEndPrice: { type: Number },
                serviceDuration: { type: String },
                serviceImageUrl: { type: String },
            },
        ],
    },
});
// Define indexes directly on the schema
// HospitalSchema.index({ hospitalName: "text" });
const Hospital = mongoose_1.default.model("Hospital", HospitalSchema);
// Ensure indexes
Hospital.ensureIndexes();
exports.default = Hospital;
