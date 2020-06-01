const User = require("../models/User");
const Credentials = require("../models/Credentials");
const ShoppingCart = require("../models/ShoppingCart");

exports.getAllUsers = () => {
  return User.findAll({
    include: [
      {
        model: Credentials,
      },
      {
        model: ShoppingCart,
      },
    ],
  });
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
