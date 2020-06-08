const Order = require("../models/Order");
const ShoppingCartItem = require("../models/ShoppingCartItem");

exports.createOrder = async (orderPayload) => {
  return Order.create(orderPayload);
};
exports.getOrders = async () => {
  return Order.findAll({
    include: [
      {
        model: ShoppingCartItem,
      },
    ],
  });
};

exports.getOrderById = async (orderId) => {
  return Order.findByPk(orderId);
};
exports.updateOrder = async (orderId, orderPayload) => {
  return Order.update(orderPayload, { where: { id: orderId } });
};

exports.deleteOrder = async (orderId) => {
  return Order.destroy({ where: { id: orderId } });
};
