const User = require("../User");
const ShoppingCart = require("../ShoppingCart");

User.hasOne(ShoppingCart,{constraints: false});
ShoppingCart.hasOne(User);
