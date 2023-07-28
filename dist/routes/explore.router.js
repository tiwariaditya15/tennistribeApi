"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var explore_controller_1 = require("../controllers/explore.controller");
var router = express_1.default.Router();
router.route("/").get(explore_controller_1.getExploreFeed);
exports.default = router;
