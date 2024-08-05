"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const post_controller_1 = require("./post.controller");
const router = express_1.default.Router();
router.post("/create", post_controller_1.createPost);
router.patch("/update/:id", post_controller_1.updatePost);
router.get("/list", post_controller_1.getPost);
router.delete("/delete/:id", post_controller_1.deleteItem);
exports.default = router;
