"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var user_controller_1 = require("../controllers/user.controller");
var router = express_1.default.Router();
router.route("/").get(user_controller_1.getUsers);
router.route("/profile").get(user_controller_1.getCurrentUserProfile);
router.route("/profile/:username").get(user_controller_1.getProfileByUsername);
router.route("/follow").post(user_controller_1.followUser);
router.route("/unfollow").post(user_controller_1.unfollowUser);
router.route("/following").get(user_controller_1.getFollowings);
exports.default = router;
