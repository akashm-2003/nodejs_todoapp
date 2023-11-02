import jwt from "jsonwebtoken";

export const createCookie = (user, res, message, statusCode = 201) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
      // SameSite none means allow to use cookie in cross site (different domain of frontend and backend)
      sameSite:  process.env.NODE_ENV === "development" ?"lax":"none",
      // Secure means allow to use cookie in https
      secure: process.env.NODE_ENV === "development" ? false : true,
      // Cookie cannot come in postman when secure is true
    })
    .json({
      success: true,
      message,
      user,
    });
};
