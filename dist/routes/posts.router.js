"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var posts_controller_1 = require("../controllers/posts.controller");
var router = express_1.default.Router();
router.route("/").get(posts_controller_1.getFeed);
// router.route("/explore").get(getExploreFeed);
router.route("/bookmarks").get(posts_controller_1.getBookmarksFeed);
router.route("/bookmark").post(posts_controller_1.toggleBookmarkPost);
router.route("/:postId").get(posts_controller_1.getPost);
router.route("/").post(posts_controller_1.newPost);
router.route("/delete").post(posts_controller_1.deletePost);
exports.default = router;
