const shoppingCartRepository = require("../repositories/shoppingCartRepository");
const userRepository = require("../repositories/userRepository");
const statusCodes = require("../errors/errors.json").status;
const exceptionMessages = require("../errors/errors.json").exception_message;
const successMessages = require("../errors/errors.json").message;

exports.addCartToUser = async (userId) => {
  let CartData;
  let CartError;
  let status;
  let message;
  try {
    CartData = await shoppingCartRepository.addShoppingCart(userId);
    status = statusCodes.status_201;
    message = successMessages.post_success;
  } catch (err) {
    CartError = err;
    status = statusCodes.status_500;
    message = exceptionMessages.post_error;
  }

  return {
    data: CartData || CartError,
    status: status,
    message: message,
  };
};

exports.getCart = async (id) => {
  let CartData;
  let CartError;
  let status;
  let message;
  try {
    CartData = await shoppingCartRepository.getShoppingCart(id);
    status = statusCodes.status_200;
    message = successMessages.get_success;
  } catch (err) {
    CartError = err;
    status = statusCodes.status_500;
    message = exceptionMessages.get_error;
  }

  return {
    data: CartData || CartError,
    status: status,
    message: message,
  };
};

exports.updateCart = async (id, cartPayload) => {
  let CartData;
  let CartError;
  let status;
  let message;
  try {
    CartData = await shoppingCartRepository.updateShoppingCart(id, cartPayload);
    status = statusCodes.status_204;
    message = successMessages.put_success;
  } catch (err) {
    CartError = err;
    status = statusCodes.status_500;
    message = exceptionMessages.put_error;
  }

  return {
    data: CartData || CartError,
    status: status,
    message: message,
  };
};

exports.deleteCart = async (id) => {
  let CartData;
  let CartError;
  let status;
  let message;
  console.log(id);
  try {
    CartData = await shoppingCartRepository.deleteShoppingCart(id);
    status = statusCodes.status_204;
    message = successMessages.delete_success;
  } catch (err) {
    CartError = err;
    status = statusCodes.status_500;
    message = exceptionMessages.delete_error;
  }

  return {
    data: CartData || CartError,
    status: status,
    message: message,
  };
};

exports.addItem = async (itemPayload) => {
  let ItemData;
  let ItemError;
  let status;
  let message;
  let updatedCartData;
  let cartId = itemPayload.shoppingCartId;
  try {
    console.log(itemPayload);
    ItemData = await shoppingCartRepository.addItem(itemPayload);
    try {
      updatedCartData = await shoppingCartRepository.updateShoppingCart(
        cartId,
        {
          shoppingCartItemId: ItemData.id,
        }
      );
    } catch (err) {
      status = statusCodes.status_500;
      message = exceptionMessages.put_error;
      return {
        data: updatedCartData,
        status: status,
        message: message,
      };
    }

    status = statusCodes.status_201;
    message = successMessages.post_success;
  } catch (err) {
    ItemError = err;
    status = statusCodes.status_500;
    message = exceptionMessages.post_error;
  }

  return {
    data: ItemData || ItemError,
    status: status,
    message: message,
  };
};

exports.getItems = async (cartId) => {
  let ItemData;
  let ItemError;
  let status;
  let message;
  try {
    ItemData = await shoppingCartRepository.getItems(cartId);

    status = statusCodes.status_200;
    message = successMessages.get_success;
  } catch (err) {
    CartError = err;
    status = statusCodes.status_500;
    message = exceptionMessages.get_error;
  }

  return {
    data: ItemData || ItemError,
    status: status,
    message: message,
  };
};
