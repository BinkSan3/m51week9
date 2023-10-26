const User = require("./model");

const { Sequelize } = require("sequelize");

const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    console.log("registerUser", req.body);

    const newUser = await User.create(req.body);
    console.log(newUser);

    res.status(201).json({ message: "success", newUser });
  } catch (error) {
    if (error.name === "sequelizeUniqueConstraintError") {
      res.stats(412).json({ message: error.message, error });
    }
    res.status(500).json({ message: error.message, error });
  }
};

const findAllUsers = async (req, res) => {
  console.log("findAllUsers");
  try {
    if (!req.user) {
      throw new Error("user is undefined");
    }

    //findUsers has also caused alot of confusion as the default we use in cose alongs would be simply user so I have needed to figure out where to use user as a front end state or when I need findUsers from this backend object so there will be a few instance where things are wrong. Again there are issues where I would know which one to use when coding along.
    const findUsers = await User.findAll();
    if (findUsers.length === 0) {
      res.status(404).json({ message: "failure" });

      return;
    }
    res.status(200).json({ message: "success", findUsers });
  } catch (error) {
    res.status(500).json({ message: error.message, error });
  }
};

const loginUser = async (req, res) => {
  console.log("hello from login user");
  try {
    if (!req.user) {
      res.status(401).json({ message: "unauthorised" });

      return;
    }

    console.log("PROBLEMZ");
    const token = await jwt.sign({ id: req.user.id }, process.env.SECRET_KEY);

    // needs object body putting in
    res.status(201).json({
      message: "Successful Login",
    });
  } catch (error) {
    res.status(500).json({ message: error.message, error });
  }
};

//updateUser
// const updateUser = async (req, res) => {
//     try {

//     } catch (error) {

//     }
// }

module.exports = { registerUser, findAllUsers, loginUser };
