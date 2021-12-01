import express from "express";
import { toggleReaction } from "../controllers/reactions.controller";
const router = express.Router();

router.route("/toggle").post(toggleReaction);
export default router;
