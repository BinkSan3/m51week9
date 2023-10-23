const { DataTypes } = require("sequelize");
const connection = require("../db/connection");

const User = connection.define("User", {
  userName: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
  },
});

module.exports = User;
