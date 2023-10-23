const { Router } = require("express");
const userRouter = Router();

const User = require("./model");

const { hashPass, comparePass } = require("../middleware/index");
const { registerUser, findAllUsers, loginUser } = require("./controllers");

userRouter.post("/", hashPass, registerUser);

userRouter.get("/", findAllUsers);

userRouter.post("/login", comparePass, loginUser);

module.exports = userRouter;
