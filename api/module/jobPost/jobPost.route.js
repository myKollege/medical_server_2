"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jobPost_controller_1 = require("./jobPost.controller");
const router = express_1.default.Router();
router.post("/create", jobPost_controller_1.createPost);
router.patch("/update/:id", jobPost_controller_1.updatePost);
router.get("/list", jobPost_controller_1.getPost);
router.delete("/delete/:id", jobPost_controller_1.deleteItem);
exports.default = router;
