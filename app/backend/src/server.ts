import express from "express";
import dotenv from "dotenv";
dotenv.config();
import "./config/db/index";
import router from "./routes/index";
import errorHandler from "./middlewares/errorHandler";

const port = process.env.PORT;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);
app.use(errorHandler);

app.listen(port, () => {
  console.log("Server running on port " + port);
});
