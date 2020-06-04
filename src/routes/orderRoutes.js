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
    console.log(orderResponse);
    res.status(orderResponse.status).json({
      data: orderResponse.data,
      message: orderResponse.message,
    });
  } catch (err) {
    next(err);
  }
});
module.exports = router;
