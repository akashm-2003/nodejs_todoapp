import { config } from "dotenv";
import express from "express";
import userRouter from "./routes/user.js";
import cookieParser from "cookie-parser";
import taskRouter from "./routes/task.js";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";
config({
  path: "./config.env",
});
export const app = express();
app.use(cookieParser())
app.use(express.json());
app.use(cors({
  origin: [process.env.CLIENT_URL],
  // This means allow to use cookies
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
}))
// This should always be last
app.use("/api/v1/users", userRouter);
app.use("/api/v1/task", taskRouter);

// Error Handling by Express
app.use(errorMiddleware)