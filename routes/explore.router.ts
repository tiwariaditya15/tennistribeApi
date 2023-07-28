import express from "express";
import { getExploreFeed } from "../controllers/explore.controller";

const router = express.Router();

router.route("/").get(getExploreFeed);

export default router;
