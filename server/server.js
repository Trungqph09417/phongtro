import express from "express";
require("dotenv").config(); // lấy giá trị dotenv
import initRoutes from "./src/routes";
import cors from "cors";
import connectDatabase from "./src/config/connectDatabase";
import generateCode from "./src/utils/generateCode";
import { dataPrice, dataArea } from "./src/utils/datas";
import { getNumberFromString } from "./src/utils/common";

// console.log(getNumberFromString(" 12.1 triệu/tháng"));

const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_URL, // cho phép url http có thể truy cập lấy data
    methods: ["POST", "GET", "PUT", "DELETE"],
  })
);
app.use(express.json()); // đọc đc dữ liệu dạng json
app.use(express.urlencoded({ extended: true })); // đọc dữ liệu dạng body khi submit lên

initRoutes(app);
connectDatabase();

const port = process.env.PORT || 8080;
const listener = app.listen(port, () => {
  console.log(`Server is running on the port ${listener.address().port}`);
});
