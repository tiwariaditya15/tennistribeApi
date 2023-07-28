"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var reactions_controller_1 = require("../controllers/reactions.controller");
var router = express_1.default.Router();
router.route("/toggle").post(reactions_controller_1.toggleReaction);
exports.default = router;
