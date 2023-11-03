import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "dotenv";
import express from "express";
import { errorMiddleware } from "./middlewares/error.js";
import taskRouter from "./routes/task.js";
import userRouter from "./routes/user.js";
import bodyParser from "body-parser";
config({
  path: "./config.env",
});
export const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//cors - Cross Origin Resource Sharing
app.use(
  cors({
    credentials: true,
    origin: [process.env.FRONTEND_URL, process.env.TEST_URL1, process.env.TEST_URL2],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
// This should always be last
app.use("/api/v1/users", userRouter);
app.use("/api/v1/task", taskRouter);

// Error Handling by Express
app.use(errorMiddleware);
