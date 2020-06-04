const orderRepository = require("../repositories/orderRepository");
const shoppingCartService = require("./shoppingCartService");
const statusCodes = require("../errors/errors.json").status;
const successMessage = require("../errors/errors.json").message;
const excetionMessage = require("../errors/errors.json").exception_message;
const userService = require("../services/userService");

exports.createOrder = async (userId, orderDescription, cartId) => {
  let orderData;
  let orderError;
  let status;
  let message;
  let orderPayload = { date: new Date(), orderDescription, total: null };
  let totalResponse;
  let itemsResponse;
  let itemsPayload;
  let userResponse;
  let userPayload = { orderId: null };
  try {
    totalResponse = await shoppingCartService.getItemsTotal(cartId);

    if (totalResponse.status === 200) {
      orderPayload = { ...orderPayload, total: totalResponse.total };
    }
    orderData = await orderRepository.createOrder(orderPayload);
    itemsPayload = { orderId: orderData.id };
    itemsResponse = await shoppingCartService.updateItems(itemsPayload, cartId);
    userPayload = { orderId: orderData.id };
    // console.log(userPayload, orderData.id);
    userResponse = await userService.updateUser(userId, userPayload);
    if (itemsResponse.status === 200 && userResponse.status === 204) {
      status = statusCodes.status_201;
      message = successMessage.post_success;
    } else console.log(userResponse.status);
  } catch (err) {
    orderError = err;
    status = statusCodes.status_500;
    message = excetionMessage.post_error;
  }

  return {
    data: orderData,
    status: status,
    message: message,
  };
};

exports.getOrders = async () => {
  let OrderData;
  let OrderError;
  let status;
  let message;
  try {
    OrderData = await orderRepository.getOrders();

    console.log(OrderData);
    status = statusCodes.status_200;
    message = successMessage.get_success;
  } catch (err) {
    OrderError = err;
    status = statusCodes.status_500;
    message = excetionMessage.get_error;
  }

  return {
    data: OrderData || OrderError,
    status,
    message,
  };
};
