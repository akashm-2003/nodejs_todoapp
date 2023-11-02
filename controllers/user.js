import bcrypt from "bcrypt";
import User from "../models/user.js";
import { createCookie } from "../utils/cookie.js";

//register User
export const postAddUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  const findUser = await User.findOne({ email });
  try {
    if (!name || !email || !password)
      return next(new Error("Please Provide Name, Email and Password", 404));
    if (findUser) return next(new Error("User Already Exist", 404));
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashPassword,
    });
    createCookie(user, res, "User Created Successfully");
  } catch (err) {
    next(err.message);
  }
};
// Login User
export const postLoginUser = async (req, res, next) => {
  const { email, password } = req.body;
  // imp to add select("+password") to get password from db as we have set select:false in user model
  const findUser = await User.findOne({ email }).select("+password");
  try {
    if (!email || !password)
      return next(new Error("Please Provide Email and Password", 404));
    if (!findUser) return next(new Error("User Not Found", 404));
    const isMatch = await bcrypt.compare(password, findUser.password);
    if (!isMatch) return next(new Error("Invalid Password", 404));
    createCookie(findUser, res, "User Logined Successfully");
  } catch (err) {
    next(err.message);
  }
};

//Logout User
export const logoutUser = (req, res, next) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
      sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "development" ? false : true,
    });
    res.status(201).json({
      success: true,
      message: "User Logout Successfully",
    });
  } catch (err) {
    next(err.message);
  }
};
// Get My Profile
export const getMyProfile = (req, res, next) => {
  try {
    res.status(201).json({
      success: true,
      user: req.user,
    });
  } catch (err) {
    next(err.message);
  }
};

//By query Method
export const getAllUser = async (req, res, next) => {
  try {
    const { currentPage, itemsPerPage } = req.query;
    // Pagination
    let users, totalPages;
    const totalUsers = await User.countDocuments();
    if (!currentPage || !itemsPerPage) {
      users = await User.find({});
    } else {
      const skipAmount = (currentPage - 1) * itemsPerPage;
      totalPages = Math.ceil(totalUsers / itemsPerPage);
      // collection
      users = await User.find({}).skip(skipAmount).limit(itemsPerPage);
    }
    res.json({
      itemsPerPage,
      currentPage,
      totalUsers,
      totalPages,
      success: true,
      users,
    });
  } catch (err) {
    next(err.message);
  }
};

// By Params Search User
export const getIdbyParams = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    res.status(201).json({
      success: true,
      user,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "No user Found",
    });
  }
};

// Update User
export const updateUser = async (req, res) => {
  const { name, email } = req.body;
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (user) {
      // 1st Method
      // const updateUser=await User.findOneAndUpdate({_id:id},{email},{ returnOriginal: false })
      // 2nd Method
      const updateUser = await User.updateOne(
        { _id: id },
        { email },
        { returnOriginal: false }
      );
      res.status(201).json({
        success: true,
        updateUser,
      });
      console.log(updateUser);
    }
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "No user Found",
    });
  }
};

//Delete User
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    // const user = await User.findOneAndDelete({_id:id});
    const user = await User.deleteOne({ _id: id });
    res.status(201).json({
      success: true,
      user,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "No user Found",
    });
  }
};
