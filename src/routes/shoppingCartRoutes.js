const express = require("express");
const router = express.Router();
const shoppingCartService = require("../services/shoppingCartService");
const authorize = require("../middlewares/authorization")
const Roles = require("../config/roles")
router.get("/:id", authorize([Roles.Admin, Roles.User]),async (req, res, next) => {
  const id = req.params.id;
  let cartResponse = null;
  try {
    cartResponse = await shoppingCartService.getCart(id);
    res.status(cartResponse.status).json({
      data: cartResponse.data,
      message: cartResponse.message,
    });
  } catch (err) {
    next(err);
  }
});

router.put("/:id",authorize([Roles.Admin, Roles.User]), async (req, res, next) => {
  const id = req.params.id;
  const cartPayload = { ...req.body };
  let cartResponse = null;
  try {
    cartResponse = await shoppingCartService.updateCart(id, cartPayload);
    res.status(cartResponse.status).json({
      data: cartResponse.data,
      message: cartResponse.message,
    });
  } catch (err) {
    next(err);
  }
});

router.delete("/:id",authorize([Roles.Admin]), async (req, res, next) => {
  const id = req.params.id;
  let cartResponse = null;

  try {
    cartResponse = await shoppingCartService.deleteCart(id);
    res.status(cartResponse.status).json({
      data: cartResponse.data,
      message: cartResponse.message,
    });
  } catch (err) {
    next(err);
  }
});

router.post("/:cartId/item",authorize([Roles.Admin, Roles.User]), async (req, res, next) => {
  const cartId = req.params.cartId;
  const itemPayload = { ...req.body, shoppingCartId: cartId };
  // itemPayload = { ...itemPayload, shoppingCartId: cartId };
  let itemResponse = null;

  console.log(cartId, itemPayload);
  try {
    itemResponse = await shoppingCartService.addItem(itemPayload);
    res.status(itemResponse.status).json({
      data: itemResponse.data,
      message: itemResponse.message,
    });
  } catch (err) {
    next(err);
  }
});

router.get("/:cartId/item", authorize([Roles.Admin, Roles.User]),async (req, res, next) => {
  const cartId = req.params.cartId;
  let itemResponse = null;

  try {
    itemResponse = await shoppingCartService.getItems(cartId);
    res.status(itemResponse.status).json({
      data: itemResponse.data,
      message: itemResponse.message,
    });
  } catch (err) {
    next(err);
  }
});

router.delete("/:cartId/item/:itemId",authorize([Roles.Admin, Roles.User]), async (req, res, next) => {
  const { cartId, itemId } = req.params;
  let itemResponse = null;

  try {
    itemResponse = await shoppingCartService.deleteItem(cartId, itemId);
    res.status(itemResponse.status).json({
      data: itemResponse.data,
      message: itemResponse.message,
    });
  } catch (err) {
    next(err);
  }
});

router.put("/:cartId/item/:itemId",authorize([Roles.Admin, Roles.User]), async (req, res, next) => {
  const { cartId, itemId } = req.params;
  let {quantity} = req.body
  let itemResponse = null;

  try {
    itemResponse = await shoppingCartService.changeQuantity(cartId, itemId, quantity);
    res.status(itemResponse.status).json({
      data: itemResponse.data,
      message: itemResponse.message,
    });
  } catch (err) {
    next(err);
  }
});
module.exports = router;
