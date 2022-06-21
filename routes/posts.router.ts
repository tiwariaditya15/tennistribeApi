import express from "express";
import {
  newPost,
  getFeed,
  getPost,
  deletePost,
  getExploreFeed,
  toggleBookmarkPost,
  getBookmarksFeed,
} from "../controllers/posts.controller";

const router = express.Router();

router.route("/").get(getFeed);
router.route("/explore").get(getExploreFeed);
router.route("/bookmarks").get(getBookmarksFeed);
router.route("/bookmark").post(toggleBookmarkPost);
router.route("/:postId").get(getPost);
router.route("/").post(newPost);
router.route("/delete").post(deletePost);

export default router;
