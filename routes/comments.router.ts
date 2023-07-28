import express from "express";
import {
  getComments,
  postComment,
  deleteComment,
} from "../controllers/comments.controller";

const router = express.Router();

router.route("/").get(getComments);
router.route("/").post(postComment);
router.route("/delete").post(deleteComment);

export default router;
