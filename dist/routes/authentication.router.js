"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var authentication_controller_1 = require("../controllers/authentication.controller");
var verifyToken_middleware_1 = __importDefault(require("../middlewares/verifyToken.middleware"));
var router = express_1.default.Router();
router.route("/validate").get(verifyToken_middleware_1.default, authentication_controller_1.validateToken);
router.route("/login").post(authentication_controller_1.login);
router.route("/signup").post(authentication_controller_1.signUp);
exports.default = router;
