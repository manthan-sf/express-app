const db = require("../config/database");
const ShoppingCartItem = require("./ShoppingCartItem");
const sequelize = require("sequelize");

const ShoppingCart = db.define("shoppingCart", {
  //   items: {
  //     type: sequelize.ARRAY(sequelize.INTEGER),
  //   },
});

ShoppingCart.hasMany(ShoppingCartItem);
module.exports = ShoppingCart;
