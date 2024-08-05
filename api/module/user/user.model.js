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
const userSchema = new mongoose_1.Schema({
    userType: {
        type: String,
        enum: [
            "civil",
            "doctor",
            "hospitals",
            "diagnosticCenter",
            "pharmacy",
            "employee",
            "serviceProvider",
        ],
        default: "civil",
    },
    fullName: {
        type: String,
    },
    serviceCategoryName: {
        type: String,
    },
    serviceCategoryId: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    age: {
        type: Number,
    },
    experience: {
        type: Number,
    },
    bio: {
        type: String,
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"],
    },
    phone: {
        type: String,
    },
    state: {
        type: String,
    },
    city: {
        type: String,
    },
    address: {
        type: String,
    },
    lat: {
        type: String,
    },
    long: {
        type: String,
    },
    emergencyContact: {
        type: String,
    },
    accountStatus: {
        type: String,
        enum: ["pending", "approved", "rejected", "onHold"],
        default: "pending",
    },
    profileImageUrl: {
        type: String,
    },
    role: {
        type: String,
    },
    accessibleRoutes: {
        type: [String],
    },
    insurance: {
        companyName: {
            type: String,
        },
        policyNumber: {
            type: String,
        },
        planName: {
            type: String,
        },
        insuranceExpiryDate: {
            type: String,
        },
        insuranceImageUrl: {
            type: String,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
        },
    },
    hasPatients: [
        {
            name: String,
            age: String,
            phone: String,
            note: String,
        },
    ],
});
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
