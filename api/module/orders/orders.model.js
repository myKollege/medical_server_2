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
const OrderSchema = new mongoose_1.Schema({
    // Consumer fields
    servicesReceiverId: { type: String },
    servicesReceiverName: { type: String },
    servicesReceiverPhoneNumber: { type: String },
    servicesReceiverNotes: { type: String },
    servicesReceiverAddress: { type: String },
    servicesReceiverEmail: { type: String },
    // Provider fields
    serviceProviderId: { type: String },
    serviceProviderName: { type: String },
    serviceProviderPhoneNumber: { type: String },
    serviceLocation: { type: String },
    image: { type: String, required: false }, // Optional image field
    // Product fields
    productName: { type: String },
    productId: { type: String },
    productCategory: { type: String },
    price: { type: String },
    quantity: { type: Number },
    status: {
        type: String,
        enum: ["pending", "onTheWay", "delivered", "canceled", "returned"],
    },
    deliveryOption: {
        type: String,
        enum: ["cashOnDelivery", ""],
    },
    // Conversions (Messages between provider and receiver)
    conversions: [
        {
            user: { type: String, enum: ["provider", "receiver"] },
            message: { type: String },
            id: { type: String },
        },
    ],
});
const Order = mongoose_1.default.model("Order", OrderSchema);
exports.default = Order;
