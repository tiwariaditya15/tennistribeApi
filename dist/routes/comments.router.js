"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var comments_controller_1 = require("../controllers/comments.controller");
var router = express_1.default.Router();
router.route("/").get(comments_controller_1.getComments);
router.route("/").post(comments_controller_1.postComment);
router.route("/delete").post(comments_controller_1.deleteComment);
exports.default = router;
