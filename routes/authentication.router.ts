import express from "express";
import {
  login,
  signUp,
  validateToken,
} from "../controllers/authentication.controller";
import verifyToken from "../middlewares/verifyToken.middleware";

const router = express.Router();

router.route("/validate").get(verifyToken, validateToken);
router.route("/login").post(login);
router.route("/signup").post(signUp);

export default router;
