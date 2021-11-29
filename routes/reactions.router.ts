import express from "express";
import {} from "../controllers/user.controller";
const router = express.Router();

router.route("/add").post();
router.route("/remove").get();
export default router;
