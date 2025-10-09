import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import "./config/db/index";
import router from "./routes/index";
import errorHandler from "./middlewares/errorHandler";
import path from "path";

const port = process.env.PORT;
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use("/api", router);
app.use(errorHandler);

app.listen(port, () => {
  console.log("Server running on port " + port);
});
