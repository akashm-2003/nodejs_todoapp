import mongoose from "mongoose";

export const connectDB=()=>{ mongoose
  .connect(process.env.MONGO_URL, {
    dbName: "toDoList",
  })
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.log(err);
  });
}