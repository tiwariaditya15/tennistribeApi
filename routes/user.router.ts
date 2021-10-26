import express from "express";
import { login, signUp } from "../controllers/user.controller";

const router = express.Router();

router.route("/login").post(login);
router.route("/signup").post(signUp);

export default router;
