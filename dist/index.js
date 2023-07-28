"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var dotenv = __importStar(require("dotenv"));
var authentication_router_1 = __importDefault(require("./routes/authentication.router"));
var posts_router_1 = __importDefault(require("./routes/posts.router"));
var comments_router_1 = __importDefault(require("./routes/comments.router"));
var user_router_1 = __importDefault(require("./routes/user.router"));
var reactions_router_1 = __importDefault(require("./routes/reactions.router"));
var explore_router_1 = __importDefault(require("./routes/explore.router"));
var verifyToken_middleware_1 = __importDefault(require("./middlewares/verifyToken.middleware"));
var routeNotFound_1 = require("./middlewares/routeNotFound");
dotenv.config();
var app = (0, express_1.default)();
var PORT = parseInt(process.env.PORT, 10);
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/explore", explore_router_1.default);
app.use("/accounts", authentication_router_1.default);
app.use(verifyToken_middleware_1.default);
app.use("/posts", posts_router_1.default);
app.use("/comments", comments_router_1.default);
app.use("/users", user_router_1.default);
app.use("/reactions", reactions_router_1.default);
app.use(routeNotFound_1.routeNotFound);
app.listen(PORT, function () { return console.log("server running at port ".concat(PORT)); });
module.exports = app;
