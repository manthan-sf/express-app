const userRepository = require("../repositories/userRepository");
const statusCodes = require("../errors/errors.json").status;
const exceptionMessages = require("../errors/errors.json").exception_message;
const successMessages = require("../errors/errors.json").message;
const shoppingCartRepository = require("../repositories/shoppingCartRepository");
let userService;

exports.getUsers = async () => {
  let message;
  let status;
  let userError;
  let usersData;
  try {
    usersData = await userRepository.getAllUsers();
    if (!usersData) {
      message = exceptionMessages.not_found;
      status = statusCodes.status_404;
    } else {
      message = successMessages.get_success;
      status = 200;
    }
  } catch (err) {
    userError = err;
    message = exceptionMessages.get_error;
    status = statusCodes.status_500;
  }

  return {
    data: usersData || userError,
    status: status,
    message: message,
  };
};

exports.addUser = async (userPayload) => {
  let userData;
  let status;
  let userError;
  let message;
  try {
    userData = await userRepository.create(userPayload);
    cartData = await shoppingCartRepository.addShoppingCart(userData.id);

    await userData.update({ shoppingCartId: cartData.id });
    message = successMessages.post_success;
    status = statusCodes.status_201;
  } catch (err) {
    userError = err;
    message = exceptionMessages.post_error;
    status = statusCodes.status_500;
  }

  return {
    data: userData || userError,
    message: message,
    status: status,
  };
};

exports.getUser = async (id) => {
  let userData;
  let status;
  let userError;
  let message;

  try {
    userData = await userRepository.getById(id);
    if (!userData) {
      message = exceptionMessages.not_found;
      status = statusCodes.status_404;
    } else {
      message = successMessages.get_success;
      status = 200;
    }
  } catch (err) {
    userError = err;
    message = exceptionMessages.get_error;
    status = statusCodes.status_500;
  }

  return {
    data: userData || userError,
    status: status,
    message: message,
  };
};

exports.updateUser = async (id, userPayload) => {
  console.log(id, userPayload);
  let userData;
  let status;
  let userError;
  let message;

  try {
    userData = await userRepository.updateById(id, userPayload);
    message = successMessages.put_success;
    status = statusCodes.status_204;
  } catch (err) {
    userError = err;
    message = exceptionMessages.put_error;
    status = statusCodes.status_500;
  }

  return {
    data: userData || userError,
    message: message,
    status: status,
  };
};

exports.deleteUser = async (id) => {
  let userData;
  let status;
  let userError;
  let message;

  try {
    userData = await userRepository.delete(id);
    message = successMessages.delete_success;
    status = statusCodes.status_204;
  } catch (err) {
    userError = err;
    message = exceptionMessages.delete_error;
    status = statusCodes.status_500;
  }

  return {
    data: userData || userError,
    message: message,
    status: status,
  };
};
