"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const event_controller_1 = require("./event.controller");
const router = express_1.default.Router();
router.post("/create", event_controller_1.createEvent);
router.patch("/update/:id", event_controller_1.updateEvent);
router.get("/list", event_controller_1.getEvent);
router.delete("/delete/:id", event_controller_1.deleteItem);
exports.default = router;
