const productRepository = require("../repositories/productRepository");
const statusCodes = require("../config/errors.json").status;
const successMessages = require("../config/errors.json").message;
const exceptionMessages = require("../config/errors.json").exception_message;

exports.getProducts = async () => {
  let productData;
  let productError;
  let status;
  let message;

  try {
    productData = await productRepository.getAllProducts();
    message = successMessages.get_success;
    status = statusCodes.status_200;
  } catch (err) {
    productError = err;
    message = exceptionMessages.get_error;
    status = statusCodes.status_500;
  }

  return {
    data: productData || productError,
    status: status,
    message: message,
  };
};

exports.addProduct = async (productPayload) => {
  let productData;
  let message;
  let productError;
  let status;

  try {
    productData = await productRepository.create(productPayload);
    message = successMessages.post_success;
    status = statusCodes.status_201;
  } catch (err) {
    productError = err;
    message = exceptionMessages.post_error;
    status = statusCodes.status_500;
  }

  return {
    data: productData || productError,
    status: status,
    message: message,
  };
};

exports.getProduct = async (id) => {
  let productData;
  let message;
  let productError;
  let status;

  try {
    productData = await productRepository.getById(id);
    message = successMessages.get_success;
    status = statusCodes.status_200;
  } catch (err) {
    productError = err;
    message = exceptionMessages.get_error;
    status = statusCodes.status_500;
  }

  return {
    data: productData || productError,
    status: status,
    message: message,
  };
};

exports.updateProduct = async (id, productPayload) => {
  let productData;
  let message;
  let productError;
  let status;

  try {
    productData = await productRepository.updateById(id, productPayload);
    message = successMessages.put_success;
    status = statusCodes.status_204;
  } catch (err) {
    productError = err;
    message = exceptionMessages.put_error;
    status = statusCodes.status_500;
  }

  return {
    data: productData || productError,
    status: status,
    message: message,
  };
};

exports.deleteProduct = async (id) => {
  let productData;
  let message;
  let productError;
  let status;

  try {
    productData = await productRepository.delete(id);
    message = successMessages.delete_success;
    status = statusCodes.status_204;
  } catch (err) {
    productError = err;
    message = exceptionMessages.delete_error;
    status = statusCodes.status_500;
  }

  return {
    data: productData || productError,
    status: status,
    message: message,
  };
};
