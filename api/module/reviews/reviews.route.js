"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const reviews_controller_1 = require("./reviews.controller");
const router = express_1.default.Router();
router.post("/create", reviews_controller_1.createReview);
router.patch("/update/:id", reviews_controller_1.updateReview);
router.get("/list", reviews_controller_1.getReview);
router.delete("/delete/:id", reviews_controller_1.deleteItem);
exports.default = router;
