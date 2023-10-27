const { Router } = require("express");
const userRouter = Router();

const User = require("./model");

const { hashPass, comparePass, tokenCheck } = require("../middleware/index");
const {
  registerUser,
  findAllUsers,
  loginUser,
  deleteUser,
} = require("./controllers");

userRouter.post("/", hashPass, registerUser);

userRouter.get("/", tokenCheck, findAllUsers);

userRouter.post("/login", comparePass, loginUser);

userRouter.get("/authCheck", tokenCheck, loginUser);

userRouter.delete("/deleteOne", tokenCheck, deleteUser);

module.exports = userRouter;
