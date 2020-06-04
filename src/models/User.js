const sequelize = require("sequelize");
const db = require("../config/database");
const Credentials = require("./Credentials");
const ShoppingCart = require("./ShoppingCart");
const Order = require("./Order");
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
User.belongsTo(Order);
module.exports = User;
