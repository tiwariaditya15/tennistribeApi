import express from "express";
import {
  getUsers,
  followUser,
  getUser,
  getFollowings,
} from "../controllers/user.controller";
const router = express.Router();

router.route("/").get(getUsers);
router.route("/profile").get(getUser);
router.route("/follow").post(followUser);
router.route("/following").get(getFollowings);
export default router;
