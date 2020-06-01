const User = require("../models/User");
const Credentials = require("../models/Credentials");

exports.getAllUsers = () => {
  return User.findAll();
};

exports.create = (userPayload) => {
  return User.create(userPayload);
};

exports.delete = (id) => {
  return User.destroy({ where: { id: id } });
};

exports.updateById = (id, userPayload) => {
  return User.update(userPayload, { where: { id: id } });
};

exports.getById = (id) => {
  return User.findByPk(id);
};

