const bcrypt = require("bcrypt");

const User = require("../user/model");

const saltRounds = parseInt(process.env.SALT_ROUNDS);

const jwt = require("jsonwebtoken");

const hashPass = async (req, res, next) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, saltRounds);
    console.log("hashPass", hashPass);
    next();
  } catch (error) {
    res.status(501).json({ errormessage: error.message, error });
  }
};

const comparePass = async (req, res, next) => {
  try {
    req.user = await User.findOne({ where: { userName: req.body.userName } });
    console.log("from compare pass", req.user);
    if (!req.user) {
      res.status(401).json({ message: "Invalid Username" });
      return;
    }
    const unhashedPassword = await bcrypt.compare(
      req.body.password,
      req.user.password
    );
    if (!unhashedPassword) {
      res.send("not authorized");
    }
    next();

    //find the user
    //compare the password
    //1a. username incorrect
    //1b. password incorrect
    //2. works
  } catch (error) {
    res.status(501).json({ errormessage: error.message, error });
  }
};

//tokenCheck

let otherToken = "Random string";

const tokenCheck = async (req, res, next) => {
  try {
    let generatedToken = req.header("Authorization").replace("Bearer ", "");

    const decodedToken = await jwt.verify(
      generatedToken,
      process.env.SECRET_KEY
    );
    req.user = await User.findOne({ where: { id: decodedToken.id } });
    req.user = await User.findOne({ where: { id: 1 } });
    console.log(req.user);
    console.log("Valid Token");
    next();
  } catch {
    console.log("Invalid Token");
  }
};

module.exports = { hashPass, comparePass, tokenCheck };
