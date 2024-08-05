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
const ProductSchema = new mongoose_1.Schema({
    name: {
        type: String,
    },
    imageUrls: {
        type: [String],
    },
    brand: {
        type: String,
    },
    genericName: {
        type: String,
    },
    type: {
        type: String,
    },
    package: {
        type: String,
    },
    packageType: {
        type: String,
    },
    description: {
        type: String,
    },
    shortDescription: {
        type: String,
    },
    benefits: {
        type: String,
    },
    sideEffects: {
        type: String,
    },
    howToUse: {
        type: String,
    },
    safetyAdvice: {
        type: String,
    },
    useFor: {
        type: String,
    },
    prescriptionRequired: {
        type: Boolean,
        default: false,
    },
    primaryUser: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
    categoryName: {
        type: String,
    },
    categoryId: {
        type: String,
    },
    subcategoryName: {
        type: String,
    },
    subcategoryId: {
        type: String,
    },
    companyName: {
        type: String,
    },
});
const Product = mongoose_1.default.model("Product", ProductSchema);
exports.default = Product;