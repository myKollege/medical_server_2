"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const solution_controller_1 = require("./solution.controller");
const router = express_1.default.Router();
router.post("/create", solution_controller_1.createSolution);
router.patch("/update/:id", solution_controller_1.updateSolution);
router.get("/list", solution_controller_1.getSolution);
router.delete("/delete/:id", solution_controller_1.deleteItem);
exports.default = router;
