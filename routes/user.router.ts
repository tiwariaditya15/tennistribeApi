import express from "express";
import {
  getUsers,
  followUser,
  getUser,
  getFollowings,
  unfollowUser,
} from "../controllers/user.controller";
const router = express.Router();

router.route("/").get(getUsers);
router.route("/profile").get(getUser);
router.route("/follow").post(followUser);
router.route("/unfollow").post(unfollowUser);
router.route("/following").get(getFollowings);
export default router;
