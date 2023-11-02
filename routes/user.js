import express from "express";
import { deleteUser, getAllUser, getIdbyParams, getMyProfile, logoutUser, postAddUser, postLoginUser, updateUser } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello World");
});
//By query Method
router.get("/all",getAllUser);

//Add User
router.post("/register", postAddUser);

//Login User
router.post("/login", postLoginUser);

//Logout User
router.get("/logout", logoutUser)
//Get My Profile
router.get("/me",isAuthenticated, getMyProfile);

//Update User Profile
router.route("/:id").get(getIdbyParams).put(updateUser).delete(deleteUser);
export default router;
