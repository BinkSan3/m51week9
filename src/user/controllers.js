const User = require("./model");

const { Sequelize } = require("sequelize");

require("dotenv").config();

const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    console.log("registerUser", req.body);

    const user = await User.create(req.body);
    console.log(user);

    res.status(201).json({ message: "success", user });
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

    //users has also caused alot of confusion as the default we use in cose alongs would be simply user so I have needed to figure out where to use user as a front end state or when I need users from this backend object so there will be a few instance where things are wrong. Again there are issues where I would know which one to use when coding along.
    //DONE

    const users = await User.findAll();
    if (users.length === 0) {
      res.status(404).json({ message: "failure" });

      return;
    }
    res.status(200).json({ message: "success", users });
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
    console.log(
      "THIS PART WONT CONSOLE LOG BUT PROBLEMZ DOES,,, but now we got it working"
    );

    // needs object body putting in
    res.status(201).json({
      message: "Success",
      user: {
        username: req.user.username,
        email: req.user.email,
        token,
      },
    });
    console.log(
      token,
      "CAN CONSOLE LOG token but not message or user because I dont know what it is stored as"
    );
    return;
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
