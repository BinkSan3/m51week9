const { DataTypes } = require("sequelize");
const connection = require("../db/connection");

const User = connection.define("User", {
  //userName has been an issue need to change this to username and do this in all appropriate area in both front and back end. Has created massive isues with responses when trying to keep up typing on code alongs and end up typing username no caps
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
