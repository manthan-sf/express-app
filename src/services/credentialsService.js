const credentialsRepository = require("../repositories/credentialsRepository");
const statusCodes = require("../config/errors.json").status;
const exceptionMessages = require("../config/errors.json").exception_message;
const successMessages = require("../config/errors.json").message;

exports.addCredential = async (credentialsPayload) => {
  let credentialData;
  let message;
  let credentialError;
  let status;

  try {
    credentialData = await credentialsRepository.create(credentialsPayload);
    message = successMessages.post_success;
    status = statusCodes.status_201;
  } catch (err) {
    credentialError = err;
    message = exceptionMessages.post_error;
    status = statusCodes.status_500;
  }

  return {
    data: credentialData || credentialError,
    message: message,
    status: status,
  };
};

exports.changePassword = async (userId, passwordPayload) => {
  let credentialData;
  let message;
  let credentialError;
  let status;

  try {
    credentialData = await credentialsRepository.changePassword(
      userId,
      passwordPayload
    );
    message = successMessages.put_success;
    status = statusCodes.status_204;
  } catch (err) {
    credentialError = err;
    message = exceptionMessages.put_error;
    status = statusCodes.status_500;
  }

  return {
    data: credentialData || credentialError,
    message: message,
    status: status,
  };
};
