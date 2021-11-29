import express from "express";
import { newPost, getPosts, getPost } from "../controllers/posts.controller";

const router = express.Router();

router.route("/").get(getPosts);
router.route("/:postId").get(getPost);
router.route("/").post(newPost);

export default router;
