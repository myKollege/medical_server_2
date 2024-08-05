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
const EventSchema = new mongoose_1.Schema({
    eventName: { type: String },
    description: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    country: { type: String },
    capital: { type: String },
    language: { type: String },
    area: { type: String },
    temperatureInEventMonth: { type: Number },
    currency: { type: String },
    weather: { type: String },
    currencyExchangeRate: { type: String },
    airportName: { type: String },
    preDepartureChecklist: [{ type: String }],
    dos: [{ type: String }],
    donts: [{ type: String }],
    imageUrls: [{ type: String }],
    itineraryDocUrl: { type: String },
    itinerary: [
        {
            title: { type: String },
            date: { type: Date },
            scheduleTime: { type: String },
        },
    ],
    meetings: [
        {
            title: { type: String },
            date: { type: Date },
            scheduleTime: { type: String },
        },
    ],
    contact: [
        {
            name: { type: String },
            phone: { type: String },
            location: { type: String },
        },
    ],
    hotelInfo: [
        {
            name: { type: String },
            address: { type: String },
            imageUrl: { type: String },
            mapUrl: { type: String },
            phone: { type: String },
        },
    ],
    places: [
        {
            name: { type: String },
            mapUrl: { type: String },
            address: { type: String },
            description: { type: String },
            imageUrl: { type: String },
        },
    ],
    countryCode: { type: String },
    guidebookUrl: { type: String },
    welcomeImageUrl: { type: String },
});
const Event = mongoose_1.default.model("Event", EventSchema);
exports.default = Event;
