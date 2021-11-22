import express from "express";
import {
  getUsers,
  followUser,
  getUser,
  getFollowings,
} from "../controllers/user.controller";
const router = express.Router();

router.route("/").get(getUsers);
router.route("/following").get(getFollowings);
router.route("/:userId").get(getUser);
router.route("/follow").post(followUser);
export default router;
