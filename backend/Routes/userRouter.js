import express from "express";
import {
  getUser,
  updateUser,
  DeleteUser,
  FollowUser,
  UnFollowUser,
  TopFollowed,
  getAllUsers,
} from "../Controllers/UserControllers.js";
import { auth } from "../middlewares/auth.js";
const router = express.Router();

//top10users
router.get("/TopFollowed", TopFollowed);
//Get all users
router.get("/", getAllUsers);
//Getuser
router.get("/:id", getUser);
// Updateuser  --> this will basically update the username password and other things
router.put("/:id/Update", auth, updateUser);
// Follow
router.put("/:id/Follow", auth, FollowUser);
// Unfollow
router.put("/:id/UnFollow", auth, UnFollowUser);
//Delete Account
router.delete("/:id/deleteUser", DeleteUser);

export default router;
