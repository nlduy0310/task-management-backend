import dotenvConfig from "dotenv/config";
import express from "express";
import cors from "cors";
import corsOptions from "./configs/corsOptions.js";
import mongoose from "mongoose";
import connectDB from "./configs/dbConnection.js";
import cookieParser from "cookie-parser";
import verifyJWT from "./middleware/verifyJWT.js";

// * Route Imports
import signupRoute from "./routes/signup.js";
import authRoute from "./routes/auth.js";
import refreshRoute from "./routes/refresh.js";
import signoutRoute from "./routes/signout.js";
import taskRoute from "./routes/task.js";
import userRoute from "./routes/user.js";

const app = express();
connectDB();
const PORT = process.env.PORT || 3000;

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/auth", authRoute);
app.use("/signup", signupRoute);
app.use("/refresh", refreshRoute);
app.use("/signout", signoutRoute);
app.use("/task", verifyJWT, taskRoute);
app.use("/user", verifyJWT, userRoute);

app.get("/protected", verifyJWT, (req, res, next) => {
  res.status(200).send("In protected route");
});

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
});
