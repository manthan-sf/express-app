const Credentials = require("../models/Credentials");

exports.create = (credentialsPayload) => {
  return Credentials.create(credentialsPayload);
};

exports.changePassword = (userId, passwordPayload) => {
  return Credentials.update(passwordPayload, { where: { userId: userId } });
};

exports.getCredentials = (userId) => {
  return Credentials.findOne({ where: { userId: userId } });
};
