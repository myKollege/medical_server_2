"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const applications_contrller_1 = require("./applications.contrller");
const router = express_1.default.Router();
router.post("/create", applications_contrller_1.createApplication);
router.patch("/update/:id", applications_contrller_1.updateApplication);
router.get("/list", applications_contrller_1.getApplication);
router.delete("/delete/:id", applications_contrller_1.deleteItem);
exports.default = router;
