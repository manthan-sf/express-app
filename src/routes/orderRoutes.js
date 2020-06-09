const express = require("express");
const router = express.Router();
const orderService = require("../services/orderService");
const authorize = require("../middlewares/authorization")
const Roles =require("../config/roles")

router.post("/shoppingCart/:cartId/user/:userId", authorize([Roles.Admin, Roles.User]),async (req, res, next) => {
  const { cartId, userId } = req.params;
  const { orderDescription } = req.body;
  let orderResponse;
  try {
    orderResponse = await orderService.createOrder(
      userId,
      orderDescription,
      cartId
    );
    res.status(orderResponse.status).json({
      data: orderResponse.data,
      message: orderResponse.message,
    });
  } catch (err) {
    next(err);
  }
});

router.get("/",authorize([Roles.Admin]), async (req, res, next) => {
  let orderResponse;

  try {
    orderResponse = await orderService.getOrders();
    res.status(orderResponse.status).json({
      data: orderResponse.data,
      message: orderResponse.message,
    });
  } catch (err) {
    next(err);
  }
});

router.get("/:orderId",authorize([Roles.Admin, Roles.User]), async (req, res, next) => {
  let { orderId } = req.params;
  let orderResponse;
  try {
    orderResponse = await orderService.getOrderById(orderId);
    res.status(orderResponse.status).json({
      data: orderResponse.data,
      message: orderResponse.message,
    });
  } catch (err) {
    next(err);
  }
});

router.put("/:orderId", authorize([Roles.Admin, Roles.User]),async (req, res, next) => {
  let { orderId } = req.params;
  let orderPayload = { ...req.body };
  let orderResponse;

  try {
    orderResponse = await orderService.updateOrder(orderId, orderPayload);

    res.status(orderResponse.status).json({
      data: orderResponse.data,
      message: orderResponse.message,
    });
  } catch (err) {
    next(err);
  }
});

router.delete("/:orderId", authorize([Roles.Admin, Roles.User]),async (req, res, next) => {
    let { orderId } = req.params;
    let orderResponse;
  
    try {
      orderResponse = await orderService.deleteOrder(orderId);
  
      res.status(orderResponse.status).json({
        data: orderResponse.data,
        message: orderResponse.message,
      });
    } catch (err) {
      next(err);
    }
  });
module.exports = router;
