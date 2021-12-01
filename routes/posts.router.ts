import express from "express";
import {
  newPost,
  getFeed,
  getPost,
  deletePost,
} from "../controllers/posts.controller";

const router = express.Router();

router.route("/").get(getFeed);
router.route("/:postId").get(getPost);
router.route("/").post(newPost);
router.route("/delete").post(deletePost);

export default router;
