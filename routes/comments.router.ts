import express from "express";
import { getComments, postComment } from "../controllers/comments.controller";

const router = express.Router();

router.route("/").get(getComments);
router.route("/").post(postComment);

export default router;
