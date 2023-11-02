import User from "../models/user.js";
import jwt from "jsonwebtoken";
export const isAuthenticated=async(req,res,next)=>{
    const token = req.cookies.token;
    if (!token)
      return res
        .status(404)
        .json({ success: false, message: "Login First" });
    const decodedData= jwt.verify(token, process.env.JWT_SECRET);
    const id=decodedData._id;
    req.user=await User.findById(id);
    next();
}