const sequelize = require("sequelize");
const db = require("../config/database");
const Credentials = require("./Credentials");
const User = db.define("user", {
  firstName: {
    type: sequelize.STRING,
  },
  lastName: {
    type: sequelize.STRING,
  },
  role: {
    type: sequelize.STRING,
  },
  email: {
    type: sequelize.STRING,
    allowNull: false,
  },
});

User.hasOne(Credentials);

module.exports = User;
