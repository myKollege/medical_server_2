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
const DoctorSchema = new mongoose_1.Schema({
    userId: { type: String },
    name: { type: String },
    chamberName: { type: String },
    hospitalId: { type: String },
    specialization: { type: String },
    education: { type: [String] },
    tags: { type: [String] },
    experience: { type: Number },
    affiliatedHospitals: { type: [String] },
    biography: { type: String },
    awardsAndRecognition: { type: [String] },
    languagesSpoken: { type: [String] },
    consultationFee: { type: Number },
    consultationDuration: { type: Number },
    appointmentsAvailable: { type: Boolean },
    scheduleList: {
        type: [
            {
                day: {
                    type: String,
                    enum: [
                        "monday",
                        "tuesday",
                        "wednesday",
                        "thursday",
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
    ratings: {
        type: [
            {
                userId: { type: String },
                userImage: { type: String },
                userName: { type: String },
                rating: { type: Number },
                review: { type: String },
            },
        ],
    },
    chamberLocation: {
        type: [
            {
                city: { type: String },
                state: { type: Number },
                latitude: { type: String },
                longitude: { type: String },
                pinCode: { type: String },
                address: { type: String },
            },
        ],
    },
    profileImageUrl: { type: String },
    contactNumber: { type: String },
    isVerified: { type: Boolean },
});
const Doctor = mongoose_1.default.model("Doctor", DoctorSchema);
exports.default = Doctor;
