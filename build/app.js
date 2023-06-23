"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const eventRoutes_1 = __importDefault(require("./routes/eventRoutes"));
const mongoose_1 = __importDefault(require("mongoose"));
const connectionString = "mongodb://127.0.0.1:27017/testDB";
mongoose_1.default.connect(connectionString).then(() => console.log("database connection successful!"), (err) => console.log("Error connecting to the database", err));
const app = (0, express_1.default)();
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// routes
app.use("/api/event", eventRoutes_1.default);
app.use((req, res, next) => {
    res.status(404).end();
});
app.listen(3000);
