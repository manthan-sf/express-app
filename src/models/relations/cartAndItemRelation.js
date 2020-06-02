const ShoppingCart = require("../ShoppingCart");
const ShoppingCartItem = require("../ShoppingCartItem");

ShoppingCart.hasMany(ShoppingCartItem);
ShoppingCartItem.hasOne(ShoppingCart, {constraints: false});
module.exports = {
  ShoppingCart,
  ShoppingCartItem,
};
