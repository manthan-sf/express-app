const express = require("express");
const router = express.Router();
const orderService = require("../services/orderService");

router.post("/shoppingCart/:cartId/user/:userId", async (req, res, next) => {
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

router.get("/", async (req, res, next) => {
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

router.get("/:orderId", async (req, res, next) => {
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

router.put("/:orderId", async (req, res, next) => {
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

router.delete("/:orderId", async (req, res, next) => {
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
