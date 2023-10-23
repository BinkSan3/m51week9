require("dotenv").config();
const express = require("express");

const User = require("./user/model");

const port = process.env.PORT || 5001;

const userRouter = require("./user/routes");

const app = express();

app.use(express.json());

app.use("/users", userRouter);

const syncTables = async () => {
  await User.sync();
};

app.get("/health", (req, res) => {
  res.json(200).json({ message: "API is healthy" });
});

app.listen(port, () => {
  syncTables();
  console.log("app is listening");
});
