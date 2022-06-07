import express from "express";
import {
  getUsers,
  followUser,
  getCurrentUserProfile,
  getFollowings,
  unfollowUser,
  getProfileByUsername,
} from "../controllers/user.controller";
const router = express.Router();

router.route("/").get(getUsers);
router.route("/profile").get(getCurrentUserProfile);
router.route("/profile/:username").get(getProfileByUsername);
router.route("/follow").post(followUser);
router.route("/unfollow").post(unfollowUser);
router.route("/following").get(getFollowings);
export default router;
