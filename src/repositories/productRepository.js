const Product = require("../models/Product");


exports.create = (productPayload) => {
  return Product.create(productPayload);
};

exports.getById = (id) => {
  return Product.findByPk(id);
};

exports.getAllProducts = () => {
  return Product.findAll();
};

exports.updateById = (id, productPayload) => {
  return Product.update(productPayload, { where: { id: id } });
};

exports.delete = (id) => {
  return Product.destroy({ where: { id: id } });
};
