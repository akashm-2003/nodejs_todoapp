import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "dotenv";
import express from "express";
import { errorMiddleware } from "./middlewares/error.js";
import taskRouter from "./routes/task.js";
import userRouter from "./routes/user.js";
config({
  path: "./config.env",
});
export const app = express();
app.use(cookieParser());
app.use(express.json());
//cors - Cross Origin Resource Sharing
app.use(
  cors({
    // origin is used which frontend website can access the api
    origin: [process.env.FRONTEND_URL],
    // origin: "https://www.akashtodoapp.com",
    // This means allow to use cookies
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
// This should always be last
app.use("/api/v1/users", userRouter);
app.use("/api/v1/task", taskRouter);

// Error Handling by Express
app.use(errorMiddleware);
