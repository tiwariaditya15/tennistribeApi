import express from "express";
import { newPost, getPosts } from "../controllers/posts.controller";

const router = express.Router();

router.route("/").get(getPosts);
router.route("/").post(newPost);

export default router;
