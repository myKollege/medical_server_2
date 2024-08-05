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
const AppointmentSchema = new mongoose_1.Schema({
    // Consumer details
    servicesReceiverId: { type: String },
    servicesReceiverName: { type: String },
    servicesReceiverPhoneNumber: { type: String },
    servicesReceiverGender: { type: String },
    servicesReceiverAge: { type: String },
    servicesReceiverNotes: { type: String },
    // Provider details
    serviceProviderId: { type: String },
    serviceProviderName: { type: String },
    serviceProviderPhoneNumber: { type: String },
    serviceSpecialization: { type: String },
    serviceLocation: { type: String },
    image: { type: String },
    status: {
        type: String,
        enum: ["pending", "canceled", "completed"],
    },
    type: {
        type: String,
        required: true,
        enum: ["bed", "doctor", "service"],
    },
    // Appointment details (day, date, and time)
    // day: { type: DayOfWeek },
    date: { type: String },
    time: { type: String },
    // Payment details
    paymentType: {
        type: String,
        // required: true,
        enum: ["onArrival", "onBooking"],
    },
    paymentStatus: {
        type: String,
        // required: true,
        enum: ["paid", "pending", "canceled", "completed", "refunded"],
    },
    paymentAmount: { type: Number },
    paymentDateTime: { type: Date },
});
const Appointment = mongoose_1.default.model("Appointment", AppointmentSchema);
exports.default = Appointment;