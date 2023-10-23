const User = require("./model");

const { Sequelize } = require("sequelize");

const registerUser = async (req, res) => {
  try {
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
  try {
    const findUsers = await User.findAll();
    if (findUsers.length >= 1) {
      res.status(200).json({ message: "success", findUsers });
      return;
    }

    res.status(404).json({ message: "failure" });
  } catch (error) {
    res.status(500).json({ message: error.message, error });
  }
};

const loginUser = async (req, res) => {
  try {
    if (req.unhashedPassword) {
      res.status(201).json({ message: "Successful Login" });
      return;
    }
    res.status(401).json({ message: "unauthorised" });
  } catch (error) {
    res.status(500).json({ message: error.message, error });
  }
};

module.exports = { registerUser, findAllUsers, loginUser };
