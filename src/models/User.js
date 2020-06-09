const sequelize = require("sequelize");
const db = require("../config/database");
const Credentials = require("./Credentials");
const ShoppingCart = require("./ShoppingCart");
const Order = require("./Order");
const User = db.define("user", {
  firstName: {
    type: sequelize.STRING,
    validate: {
      notEmpty: true,
      len: [3, 20]
    }
  },
  lastName: {
    type: sequelize.STRING,
    validate:  {
      len:[3, 20]
    }
  },
  role: {
    type: sequelize.STRING,
    validate: {
      notEmpty: true,
    }
  },
  email: {
    type: sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
      notEmpty: true,
      len: [5, 20]
    }
  },
});

User.hasOne(Credentials);
User.belongsTo(Order);
module.exports = User;
