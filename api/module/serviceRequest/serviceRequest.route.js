"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const serviceRequest_controller_1 = require("./serviceRequest.controller");
const router = express_1.default.Router();
router.post("/create", serviceRequest_controller_1.createServiceRequest);
router.patch("/update/:id", serviceRequest_controller_1.updateServiceRequest);
router.get("/list", serviceRequest_controller_1.getServiceRequest);
router.delete("/delete/:id", serviceRequest_controller_1.deleteItem);
exports.default = router;
