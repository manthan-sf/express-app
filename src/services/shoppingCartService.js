const shoppingCartRepository = require("../repositories/shoppingCartRepository");
const statusCodes = require("../config/errors.json").status;
const exceptionMessages = require("../config/errors.json").exception_message;
const successMessages = require("../config/errors.json").message;

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

