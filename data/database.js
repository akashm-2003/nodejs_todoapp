import mongoose from "mongoose";

export const connectDB=()=>{ mongoose
  .connect(process.env.MONGO_URI, {
    dbName: "toDoList",
  })
  .then((c) => {
    console.log(`connected to mongodb on host: ${c.connection.host}`);
  })
  .catch((err) => {
    console.log(err);
  });
}