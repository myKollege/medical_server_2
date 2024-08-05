"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_contrller_1 = require("./user.contrller");
const router = express_1.default.Router();
router.post("/create", user_contrller_1.createUser);
router.post("/create_bulk", user_contrller_1.createBulkUser);
router.patch("/update/:id", user_contrller_1.updateUser);
router.post("/update_bulk", user_contrller_1.updateBulkUser);
router.get("/list", user_contrller_1.getUser);
router.delete("/delete/:id", user_contrller_1.deleteItem);
router.post("/login", user_contrller_1.login);
router.get("/test", user_contrller_1.test);
exports.default = router;
