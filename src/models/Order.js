const db = require("../config/database");
const ShoppingCartItem = require("./ShoppingCartItem")
const User = require("../models/User")
const sequelize = require("sequelize");
const Order = db.define("order", {
  date: {
    type: sequelize.DATE,
  },
  total: {
    type: sequelize.INTEGER,
  },
  orderDescription: {
    type: sequelize.STRING,
  },
});
Order.hasMany(ShoppingCartItem)
module.exports = Order
