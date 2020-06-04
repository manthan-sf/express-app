const Order = require("../models/Order");
const ShoppingCartItem = require("../models/ShoppingCartItem");

exports.createOrder = async (orderPayload) => {
  return Order.create(orderPayload);
};
exports.getOrders = async () => {
  return Order.findAll({
    include:[{
      model: ShoppingCartItem
    }]
  });
};
