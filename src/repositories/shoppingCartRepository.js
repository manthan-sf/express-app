const ShoppingCart = require("../models/ShoppingCart");
const ShoppingCartItem = require("../models/ShoppingCartItem");

exports.addShoppingCart = async (userId) => {
  return ShoppingCart.create({ userId: userId });
};

exports.updateShoppingCart = async (id, cartPayload) => {
  return ShoppingCart.update(cartPayload, { where: { id: id } });
};

exports.getShoppingCart = async (id) => {
  return ShoppingCart.findByPk(id);
};

exports.deleteShoppingCart = async (id) => {
  return ShoppingCart.destroy({ where: { id: id } });
};

exports.addItem = async (itemPayload) => {
  return ShoppingCartItem.create(itemPayload);
};

exports.getItems = async (cartId) => {
  return ShoppingCartItem.findAll({ where: { shoppingCartId: cartId } });
};

exports.deleteItem = async (cartId, itemId) => {
  return ShoppingCartItem.destroy({
    where: { shoppingCartId: cartId, id: itemId },
  });
};
exports.changeQuantity = async (cartId, itemId, quantityPayload) => {
  return ShoppingCartItem.update(quantityPayload, {
    where: { shoppingCartId: cartId, id: itemId },
  });
};
exports.addItemToOrder = async (itemsPayload, cartId) => {
  return ShoppingCartItem.update(itemsPayload, {
    where: { shoppingCartId: cartId },
  });
};

exports.updateItems = async (itemsPayload, cartId) => {
  return ShoppingCartItem.update(itemsPayload, {
    where: { shoppingCartId: cartId },
  });
};
