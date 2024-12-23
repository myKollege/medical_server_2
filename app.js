"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
//============ api routes ====================
// import notificationRoutes from "./app/module/notification/notification.route";
const user_route_1 = __importDefault(require("./api/module/user/user.route"));
const hospital_route_1 = __importDefault(require("./api/module/hospital/hospital.route"));
const schedule_route_1 = __importDefault(require("./api/module/schedule/schedule.route"));
const doctors_route_1 = __importDefault(require("./api/module/doctors/doctors.route"));
const services_route_1 = __importDefault(require("./api/module/services/services.route"));
const category_route_1 = __importDefault(require("./api/module/category/category.route"));
const subCategory_route_1 = __importDefault(require("./api/module/subCategory/subCategory.route"));
const medicine_route_1 = __importDefault(require("./api/module/medicine/medicine.route"));
const post_route_1 = __importDefault(require("./api/module/post/post.route"));
const solution_route_1 = __importDefault(require("./api/module/solution/solution.route"));
const reviews_route_1 = __importDefault(require("./api/module/reviews/reviews.route"));
const appointment_route_1 = __importDefault(require("./api/module/appointment/appointment.route"));
const jobPost_route_1 = __importDefault(require("./api/module/jobPost/jobPost.route"));
const applications_route_1 = __importDefault(require("./api/module/applications/applications.route"));
const search_route_1 = __importDefault(require("./api/module/search/search.route"));
const serviceRequest_route_1 = __importDefault(require("./api/module/serviceRequest/serviceRequest.route"));
const orders_route_1 = __importDefault(require("./api/module/orders/orders.route"));
const reports_route_1 = __importDefault(require("./api/module/reports/reports.route"));
dotenv_1.default.config();
const app = (0, express_1.default)();
//middle ware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
//routes
app.use("/api/v1/user", user_route_1.default);
app.use("/api/v1/hospital", hospital_route_1.default);
app.use("/api/v1/schedule", schedule_route_1.default);
app.use("/api/v1/doctor", doctors_route_1.default);
app.use("/api/v1/service", services_route_1.default);
app.use("/api/v1/category", category_route_1.default);
app.use("/api/v1/sub_category", subCategory_route_1.default);
app.use("/api/v1/product", medicine_route_1.default);
app.use("/api/v1/post", post_route_1.default);
app.use("/api/v1/job_post", jobPost_route_1.default);
app.use("/api/v1/solution", solution_route_1.default);
app.use("/api/v1/appointment", appointment_route_1.default);
app.use("/api/v1/reviews", reviews_route_1.default);
app.use("/api/v1/applications", applications_route_1.default);
app.use("/api/v1/search", search_route_1.default);
app.use("/api/v1/service_requests", serviceRequest_route_1.default);
app.use("/api/v1/orders", orders_route_1.default);
app.use("/api/v1/reports", reports_route_1.default);
exports.default = app;
