const userRepository = require("../repositories/userRepository");
const statusCodes = require("../errors/errors.json").status;
const exceptionMessages = require("../errors/errors.json").exception_message;
const successMessages = require("../errors/errors.json").message;
const shoppingCartRepository = require("../repositories/shoppingCartRepository");
const credentialsRepository = require("../repositories/credentialsRepository");
const bcrypt = require("bcryptjs");
const config = require("../../config.json");
const jwt = require("jsonwebtoken");
const credentialsService = require("./credentialsService");
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

exports.addUser = async (userPayload, passwordPayload) => {
  let userData;
  let status;
  let userError;
  let message;
  let credentialData;
  try {
    userData = await userRepository.create(userPayload);
    passwordPayload = { ...passwordPayload, userId: userData.id };
    credentialData = await credentialsService.addCredential(passwordPayload);
    if (!credentialData) {
      throw Error("Can't add credential");
    }
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

exports.changePassword = async (userId, credentialPayload) => {
  let credentialData;
  let credentialError;
  let status;
  let message;

  try {
    credentialData = await credentialsRepository.getCredentials(userId);

    if (
      await bcrypt.compare(
        credentialPayload.oldPassword,
        credentialData.password
      )
    ) {
      credentialPayload.newPassword = await bcrypt.hash(
        credentialPayload.newPassword,
        config.salt
      );

      const passwordPayload = { password: credentialPayload.newPassword };
      await credentialsRepository.changePassword(userId, passwordPayload);
      status = statusCodes.status_204;
      message = successMessages.password_update_success;
    } else {
      status = statusCodes.status_400;
      message = exceptionMessages.wrong_password;
    }
  } catch (err) {
    credentialError = err;
    status = statusCodes.status_500;
    message = exceptionMessages.put_password_error;
  }
  return {
    data: credentialError,
    status: status,
    message: message,
  };
};

exports.authenticate = async (authenticationPayload) => {
  const { email, password } = authenticationPayload;
  let user;
  let credentialData;
  let status;
  let message;
  let credentialError;
  let token;
  try {
    user = await userRepository.getByEmail(email);
    if (!user) {
      status = statusCodes.status_404;
      message = exceptionMessages.user_not_exist;
    } else {
      credentialData = await credentialsRepository.getCredentials(user.id);
      if (!credentialData) {
        status = statusCodes.status_404;
        message = exceptionMessages.wrong_password;
      } else {
        if (await bcrypt.compare(password, credentialData.password)) {
          const { secret } = config;
          token = jwt.sign({ sub: user.id, role: user.role }, secret);
          status = statusCodes.status_200;
          message = successMessages.auth_success;
        }
      }
    }
  } catch (err) {
    credentialError = err;
    status = statusCodes.status_500;
    message = exceptionMessages.server_error;
  }

  return {
    data: {
      user: user,
      token: token,
    },
    status: status,
    message: message,
  };
};
