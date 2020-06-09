const db = require("../config/database");
const sequelize = require("sequelize");
const ShoppingCart = require("./ShoppingCart");

const ShoppingCartItem = db.define("shoppingCartItem", {
  productName: {
    type: sequelize.STRING,
    allowNull: true,
  },
  quantity: {
    type: sequelize.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  price: {
    type: sequelize.INTEGER,
  },
});


module.exports = ShoppingCartItem;
