const bcrypt = require("bcrypt");

const User = require("../user/model");

const saltRounds = parseInt(process.env.SALT_ROUNDS);

const hashPass = async (req, res, next) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, saltRounds);
    console.log(hashPass);
    next();
  } catch (error) {
    res.status(501).json({ errormessage: error.message, error });
  }
};

const comparePass = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { userName: req.body.userName } });
    if (!user) {
      res.status(401).json({ message: "Invalid Username" });
      return;
    }
    const unhashedPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    req.unhashedPassword = unhashedPassword;
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

module.exports = { hashPass, comparePass };
